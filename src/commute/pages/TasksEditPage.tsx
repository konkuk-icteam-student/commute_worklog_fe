import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../shared/components/BottomNavigation';
import TimeSelect from '../shared/components/TimeSelect';
import ClockIcon from '../shared/assets/clock.svg';
import MenuIcon from '../shared/assets/menu.svg';
import { getTasksByDate, toggleTaskComplete, createTask } from '../shared/apis/task.api';
import { getMyInfo } from '../shared/apis/user.api';
import type { Task as ApiTask } from '../shared/types/task.types';

interface DisplayTask {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  period: 'morning' | 'afternoon';
  isNew?: boolean; // 새로 추가된 업무 여부
}

// 시간 문자열을 HH:mm 형식으로 변환
const formatTime = (taskTime: string): string => {
  return taskTime.slice(0, 5); // "14:00:00" -> "14:00"
};

// 시간대(오전/오후) 결정
const getPeriod = (taskTime: string): 'morning' | 'afternoon' => {
  const hour = parseInt(taskTime.slice(0, 2), 10);
  return hour < 12 ? 'morning' : 'afternoon';
};

// API Task를 DisplayTask로 변환
const mapApiTaskToDisplay = (task: ApiTask): DisplayTask => ({
  id: task.taskId,
  title: task.title,
  time: formatTime(task.taskTime),
  completed: task.isCompleted,
  period: getPeriod(task.taskTime),
  isNew: false,
});

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function TasksEditPage() {
  const navigate = useNavigate();

  const [regularTasks, setRegularTasks] = useState<DisplayTask[]>([]);
  const [irregularTasks, setIrregularTasks] = useState<DisplayTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  // 업무 목록 조회
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTasksByDate(getTodayDateString());
      // 200 OK 응답이면 데이터가 비어있어도 UI 표시
      const regularTasksData = Array.isArray(response.details?.regularTasks)
        ? response.details.regularTasks
        : [];
      const irregularTasksData = Array.isArray(response.details?.irregularTasks)
        ? response.details.irregularTasks
        : [];
      setRegularTasks(regularTasksData.map(mapApiTaskToDisplay));
      setIrregularTasks(irregularTasksData.map(mapApiTaskToDisplay));
    } catch (err) {
      // 실제 네트워크 에러나 서버 에러일 때만 에러 표시
      console.error('Failed to fetch tasks:', err);
      setError('업무 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        if (response.isSuccess && response.details) {
          setUserId(response.details.userId);
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };
    fetchUserInfo();
  }, [fetchTasks]);

  // 업무 완료 상태 토글
  const handleToggleComplete = async (id: number, isRegular: boolean) => {
    try {
      const response = await toggleTaskComplete(id);
      if (response.isSuccess && response.details) {
        const newCompleted = response.details.isCompleted;
        if (isRegular) {
          setRegularTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: newCompleted } : task))
          );
        } else {
          setIrregularTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: newCompleted } : task))
          );
        }
      }
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  // 새 비정기 업무 추가
  const handleAddTask = async () => {
    if (!newTaskInput.trim() || isSubmitting) return;

    // 제목 길이 유효성 검사
    if (newTaskInput.trim().length > 16) {
      setTitleError('업무 제목은 최대 16자까지 입력 가능합니다.');
      return;
    }

    if (!userId) {
      setTitleError('사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setTitleError('');

      // 현재 시간 가져오기 (HH:mm:ss 형식)
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const response = await createTask({
        title: newTaskInput.trim(),
        assigneeId: userId,
        taskDate: getTodayDateString(),
        taskTime: currentTime,
        taskType: 'TT01', // 정기 업무로 변경 (요구사항에 맞춤)
      });

      if (response.isSuccess && response.details) {
        const newTask = mapApiTaskToDisplay({
          taskId: response.details.taskId,
          title: response.details.title,
          taskTime: response.details.taskTime || '00:00:00',
          isCompleted: response.details.isCompleted,
        });
        setIrregularTasks((prev) => [...prev, newTask]);
        setNewTaskInput('');
      }
    } catch (err) {
      console.error('Failed to create task:', err);
      setTitleError('업무 추가에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 시간 변경 핸들러 (API 업데이트는 저장 시에만)
  const handleTimeChange = (id: number, time: string, isRegular: boolean) => {
    if (isRegular) {
      setRegularTasks((prev) => prev.map((task) => (task.id === id ? { ...task, time } : task)));
    } else {
      setIrregularTasks((prev) => prev.map((task) => (task.id === id ? { ...task, time } : task)));
    }
  };

  const morningTasks = regularTasks.filter((t) => t.period === 'morning');
  const afternoonTasks = regularTasks.filter((t) => t.period === 'afternoon');

  // Get current date
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
  const currentDate = `${year}년 ${month}월 ${date}일 (${dayOfWeek})`;

  const handleSave = () => {
    // 체크 상태는 이미 API로 실시간 저장됨
    navigate('/tasks');
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="relative min-h-screen w-full bg-white" data-name="tasksEdit">
      {/* Background Gradient */}
      <div
        className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#f8fbff] to-[#ffffff]"
        data-name="Background"
      />

      {/* Header */}
      <div
        className="relative w-full bg-[#51a8ff] shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]"
        data-name="Container"
      >
        <div className="mx-auto flex h-[9.5rem] max-w-[39.3rem] items-center gap-[1.6rem] px-[2rem]">
          {/* Back Button */}
          <button
            onClick={handleCancel}
            className="relative flex size-[4rem] shrink-0 items-center justify-center rounded-full"
            data-name="Button"
          >
            <svg className="h-[2.4rem] w-[2.4rem]" fill="none" viewBox="0 0 24 24">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          <div className="flex flex-col gap-[0.4rem]" data-name="Container">
            <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-white">
              오늘의 업무
            </p>
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-[rgba(255,255,255,0.8)]">
              {currentDate}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full pb-[12rem] pt-[3.5rem]" data-name="Container">
        <div className="mx-auto flex max-w-[39.3rem] flex-col gap-[3.2rem] px-[2rem]">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-[4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-500">
                로딩 중...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex items-center justify-center py-[4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* Regular Tasks Section */}
          {!isLoading && !error && (
            <div className="flex w-full flex-col items-start gap-[1.6rem]" data-name="Container">
              {/* Section Header */}
              <div
                className="flex h-[3.2rem] w-full items-center gap-[0.8rem]"
                data-name="Container"
              >
                <img src={ClockIcon} alt="정기 업무" className="size-[3.2rem]" />
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-[#09121c]">
                  정기 업무
                </p>
              </div>

              {/* Morning Tasks */}
              <div className="flex w-full flex-col items-start gap-[0.8rem]" data-name="Container">
                <div className="h-[2.4rem] w-full opacity-60" data-name="Paragraph">
                  <p className="pl-[0.8rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] text-[#09121c]">
                    오전
                  </p>
                </div>
                <div className="relative w-full" data-name="Container">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border-l-[0.16rem] border-solid border-[rgba(81,168,255,0.2)]"
                  />
                  <div className="flex w-full flex-col items-start pl-[1.76rem]">
                    {morningTasks.length > 0 ? (
                      morningTasks.map((task) => (
                        <EditTaskItem
                          key={task.id}
                          task={task}
                          onToggle={(id) => handleToggleComplete(id, true)}
                          onTimeChange={(value) => handleTimeChange(task.id, value, true)}
                        />
                      ))
                    ) : (
                      <p className="py-[1.6rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400">
                        등록된 업무가 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Afternoon Tasks */}
              <div className="flex w-full flex-col items-start gap-[0.8rem]" data-name="Container">
                <div className="h-[2.4rem] w-full opacity-60" data-name="Paragraph">
                  <p className="pl-[0.8rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] text-[#09121c]">
                    오후
                  </p>
                </div>
                <div className="relative w-full" data-name="Container">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border-l-[0.16rem] border-solid border-[rgba(81,168,255,0.2)]"
                  />
                  <div className="flex w-full flex-col items-start pl-[1.76rem]">
                    {afternoonTasks.length > 0 ? (
                      afternoonTasks.map((task) => (
                        <EditTaskItem
                          key={task.id}
                          task={task}
                          onToggle={(id) => handleToggleComplete(id, true)}
                          onTimeChange={(value) => handleTimeChange(task.id, value, true)}
                        />
                      ))
                    ) : (
                      <p className="py-[1.6rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400">
                        등록된 업무가 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Irregular Tasks Section */}
          {!isLoading && !error && (
            <div className="flex w-full flex-col items-start gap-[1.6rem]" data-name="Container">
              {/* Section Header */}
              <div
                className="flex h-[3.2rem] w-full items-center gap-[0.8rem]"
                data-name="Container"
              >
                <img src={MenuIcon} alt="비정기 업무" className="size-[3.2rem]" />
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-[#09121c]">
                  비정기 업무
                </p>
              </div>

              {/* Irregular Tasks List */}
              <div className="relative w-full" data-name="Container">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border-l-[0.16rem] border-solid border-[rgba(156,163,175,0.2)]"
                />
                <div className="flex w-full flex-col items-start pl-[1.76rem]">
                  {irregularTasks.length > 0 ? (
                    irregularTasks.map((task) => (
                      <EditTaskItem
                        key={task.id}
                        task={task}
                        onToggle={(id) => handleToggleComplete(id, false)}
                        onTimeChange={(value) => handleTimeChange(task.id, value, false)}
                      />
                    ))
                  ) : (
                    <p className="py-[1.6rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400">
                      등록된 업무가 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Add New Task Section */}
          {!isLoading && !error && (
            <div className="flex flex-col gap-[0.8rem]" data-name="AddTaskWrapper">
              <div
                className="relative flex h-[51.982px] w-full shrink-0 content-stretch items-center gap-[11.992px]"
                data-name="AddTaskContainer"
              >
                {/* Text Input */}
                <div className="relative h-full grow basis-0 rounded-[10px] bg-white">
                  <div className="flex size-full flex-row items-center">
                    <div className="relative box-border flex size-full content-stretch items-center overflow-clip px-[16px] py-[12px]">
                      <input
                        type="text"
                        value={newTaskInput}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewTaskInput(value);
                          // 실시간 유효성 검사
                          if (value.length > 16) {
                            setTitleError('업무 제목은 최대 16자까지 입력 가능합니다.');
                          } else {
                            setTitleError('');
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddTask();
                          }
                        }}
                        placeholder="새 업무 추가(최대 16자)"
                        maxLength={16}
                        disabled={isSubmitting}
                        className="w-full font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] not-italic leading-[normal] text-[#09121c] outline-none placeholder:text-[#cdcdcd] disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
                  />
                </div>

                {/* Add Button */}
                <button
                  onClick={handleAddTask}
                  disabled={isSubmitting || !newTaskInput.trim()}
                  className="relative size-[51.982px] shrink-0 rounded-[10px] bg-[#51a8ff] disabled:opacity-50"
                  data-name="AddButton"
                >
                  <div className="flex size-full flex-row items-center justify-center">
                    <div className="relative box-border flex size-full content-stretch items-center justify-center py-0 pl-0 pr-[0.008px]">
                      <div className="relative size-[19.993px] shrink-0">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 20 20"
                        >
                          <g>
                            <path
                              d="M4.16518 9.99644H15.8277"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.66607"
                            />
                            <path
                              d="M9.99644 4.16518V15.8277"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.66607"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              {/* 에러 메시지 */}
              {titleError && (
                <p className="px-[0.4rem] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] text-red-500">
                  {titleError}
                </p>
              )}
            </div>
          )}

          {/* Bottom Buttons */}
          {!isLoading && !error && (
            <div className="flex h-[5.6rem] w-full items-center gap-[1.6rem]" data-name="Container">
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="flex h-[5.6rem] flex-1 items-center justify-center rounded-full bg-white shadow-[0rem_0.1rem_0.3rem_0rem_rgba(0,0,0,0.1),0rem_0.1rem_0.2rem_-0.1rem_rgba(0,0,0,0.1)]"
                data-name="Button"
              >
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-[#09121c]">
                  취소
                </p>
              </button>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="flex h-[5.6rem] flex-1 items-center justify-center rounded-full bg-[#51a8ff] shadow-[0rem_0.1rem_0.3rem_0rem_rgba(0,0,0,0.1),0rem_0.1rem_0.2rem_-0.1rem_rgba(0,0,0,0.1)]"
                data-name="Button"
              >
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-white">
                  저장
                </p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="tasks" />
    </div>
  );
}

// EditTaskItem Component
interface EditTaskItemProps {
  task: DisplayTask;
  onToggle: (id: number) => void;
  onTimeChange: (value: string) => void;
}

function EditTaskItem({ task, onToggle, onTimeChange }: EditTaskItemProps) {
  return (
    <div
      className="flex w-full items-start gap-[1.2rem] border-b border-[#f0f0f0] px-[0.4rem] py-[1.6rem]"
      data-name="TaskItem"
    >
      {/* Checkbox Button */}
      <button
        onClick={() => onToggle(task.id)}
        className="relative mt-[0.2rem] size-[2rem] shrink-0"
        data-name="Button"
      >
        <svg className="size-full" fill="none" viewBox="0 0 20 20">
          <rect
            x="2.5"
            y="2.5"
            width="15"
            height="15"
            rx="3"
            fill={task.completed ? '#51A8FF' : '#EAEAEA'}
          />
          {task.completed && (
            <path
              d="M6 10L9 13L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {/* Task Info */}
      <div className="flex flex-1 flex-col gap-[0.6rem]" data-name="Container">
        <p
          className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] ${
            task.completed ? 'text-[#51a8ff] line-through' : 'text-[#09121c]'
          }`}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-[0.8rem]">
          <TimeSelect value={task.time} onChange={onTimeChange} />
        </div>
      </div>
    </div>
  );
}
