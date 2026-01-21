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
          setRegularTasks(prev =>
            prev.map(task =>
              task.id === id ? { ...task, completed: newCompleted } : task
            )
          );
        } else {
          setIrregularTasks(prev =>
            prev.map(task =>
              task.id === id ? { ...task, completed: newCompleted } : task
            )
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
        setIrregularTasks(prev => [...prev, newTask]);
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
      setRegularTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, time } : task
        )
      );
    } else {
      setIrregularTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, time } : task
        )
      );
    }
  };

  const morningTasks = regularTasks.filter(t => t.period === 'morning');
  const afternoonTasks = regularTasks.filter(t => t.period === 'afternoon');

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
    <div className="bg-white relative min-h-screen w-full" data-name="tasksEdit">
      {/* Background Gradient */}
      <div className="absolute bg-gradient-to-b from-[#f8fbff] h-full left-0 to-[#ffffff] top-0 w-full" data-name="Background" />

      {/* Header */}
      <div className="relative bg-[#51a8ff] w-full shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]" data-name="Container">
        <div className="max-w-[39.3rem] mx-auto px-[2rem] h-[9.5rem] flex gap-[1.6rem] items-center">
          {/* Back Button */}
          <button
            onClick={handleCancel}
            className="relative rounded-full shrink-0 size-[4rem] flex items-center justify-center"
            data-name="Button"
          >
            <svg
              className="w-[2.4rem] h-[2.4rem]"
              fill="none"
              viewBox="0 0 24 24"
            >
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
            <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[1.6rem] text-white">
              오늘의 업무
            </p>
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.95rem] text-[1.3rem] text-[rgba(255,255,255,0.8)]">
              {currentDate}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full pt-[3.5rem] pb-[12rem]" data-name="Container">
        <div className="max-w-[39.3rem] mx-auto px-[2rem] flex flex-col gap-[3.2rem]">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-[4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-500">
                로딩 중...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex justify-center items-center py-[4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* Regular Tasks Section */}
          {!isLoading && !error && (
          <div className="flex flex-col gap-[1.6rem] items-start w-full" data-name="Container">
            {/* Section Header */}
            <div className="flex gap-[0.8rem] h-[3.2rem] items-center w-full" data-name="Container">
              <img src={ClockIcon} alt="정기 업무" className="size-[3.2rem]" />
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[#09121c] text-[1.6rem]">
                정기 업무
              </p>
            </div>

            {/* Morning Tasks */}
            <div className="flex flex-col gap-[0.8rem] items-start w-full" data-name="Container">
              <div className="h-[2.4rem] opacity-60 w-full" data-name="Paragraph">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.4rem] pl-[0.8rem] text-[#09121c] text-[1.6rem]">
                  오전
                </p>
              </div>
              <div className="relative w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-l-[0.16rem] border-[rgba(81,168,255,0.2)] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-col items-start pl-[1.76rem] w-full">
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
                    <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400 py-[1.6rem]">
                      등록된 업무가 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Afternoon Tasks */}
            <div className="flex flex-col gap-[0.8rem] items-start w-full" data-name="Container">
              <div className="h-[2.4rem] opacity-60 w-full" data-name="Paragraph">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.4rem] pl-[0.8rem] text-[#09121c] text-[1.6rem]">
                  오후
                </p>
              </div>
              <div className="relative w-full" data-name="Container">
                <div aria-hidden="true" className="absolute border-l-[0.16rem] border-[rgba(81,168,255,0.2)] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-col items-start pl-[1.76rem] w-full">
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
                    <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400 py-[1.6rem]">
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
          <div className="flex flex-col gap-[1.6rem] items-start w-full" data-name="Container">
            {/* Section Header */}
            <div className="flex gap-[0.8rem] h-[3.2rem] items-center w-full" data-name="Container">
              <img src={MenuIcon} alt="비정기 업무" className="size-[3.2rem]" />
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[#09121c] text-[1.6rem]">
                비정기 업무
              </p>
            </div>

            {/* Irregular Tasks List */}
            <div className="relative w-full" data-name="Container">
              <div aria-hidden="true" className="absolute border-l-[0.16rem] border-[rgba(156,163,175,0.2)] border-solid inset-0 pointer-events-none" />
              <div className="flex flex-col items-start pl-[1.76rem] w-full">
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
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.4rem] text-gray-400 py-[1.6rem]">
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
          <div className="content-stretch flex gap-[11.992px] h-[51.982px] items-center relative shrink-0 w-full" data-name="AddTaskContainer">
            {/* Text Input */}
            <div className="basis-0 grow bg-white relative rounded-[10px] h-full">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex items-center overflow-clip px-[16px] py-[12px] relative size-full">
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
                    className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[normal] not-italic w-full text-[16px] outline-none placeholder:text-[#cdcdcd] text-[#09121c] disabled:bg-gray-100"
                  />
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0.542px] border-solid inset-0 pointer-events-none rounded-[10px]" />
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddTask}
              disabled={isSubmitting || !newTaskInput.trim()}
              className="bg-[#51a8ff] relative rounded-[10px] shrink-0 size-[51.982px] disabled:opacity-50"
              data-name="AddButton"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-full">
                  <div className="relative shrink-0 size-[19.993px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g>
                        <path d="M4.16518 9.99644H15.8277" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66607" />
                        <path d="M9.99644 4.16518V15.8277" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66607" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>
          {/* 에러 메시지 */}
          {titleError && (
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] text-red-500 px-[0.4rem]">
              {titleError}
            </p>
          )}
          </div>
          )}

          {/* Bottom Buttons */}
          {!isLoading && !error && (
          <div className="flex gap-[1.6rem] h-[5.6rem] items-center w-full" data-name="Container">
            {/* Cancel Button */}
            <button
              onClick={handleCancel}
              className="flex-1 bg-white h-[5.6rem] rounded-full shadow-[0rem_0.1rem_0.3rem_0rem_rgba(0,0,0,0.1),0rem_0.1rem_0.2rem_-0.1rem_rgba(0,0,0,0.1)] flex items-center justify-center"
              data-name="Button"
            >
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[1.6rem] text-[#09121c]">
                취소
              </p>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="flex-1 bg-[#51a8ff] h-[5.6rem] rounded-full shadow-[0rem_0.1rem_0.3rem_0rem_rgba(0,0,0,0.1),0rem_0.1rem_0.2rem_-0.1rem_rgba(0,0,0,0.1)] flex items-center justify-center"
              data-name="Button"
            >
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[1.6rem] text-white">
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
    <div className="flex gap-[1.2rem] py-[1.6rem] items-start px-[0.4rem] w-full border-b border-[#f0f0f0]" data-name="TaskItem">
      {/* Checkbox Button */}
      <button
        onClick={() => onToggle(task.id)}
        className="relative shrink-0 size-[2rem] mt-[0.2rem]"
        data-name="Button"
      >
        <svg className="size-full" fill="none" viewBox="0 0 20 20">
          <rect
            x="2.5"
            y="2.5"
            width="15"
            height="15"
            rx="3"
            fill={task.completed ? "#51A8FF" : "#EAEAEA"}
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
      <div className="flex-1 flex flex-col gap-[0.6rem]" data-name="Container">
        <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.4rem] text-[1.6rem] ${
          task.completed
            ? 'line-through text-[#51a8ff]'
            : 'text-[#09121c]'
        }`}>
          {task.title}
        </p>
        <div className="flex gap-[0.8rem] items-center">
          <TimeSelect
            value={task.time}
            onChange={onTimeChange}
          />
        </div>
      </div>
    </div>
  );
}
