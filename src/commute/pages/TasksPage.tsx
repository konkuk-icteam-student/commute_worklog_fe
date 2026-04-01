import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../shared/components/BottomNavigation';
import ClockIcon from '../shared/assets/clock.svg';
import MenuIcon from '../shared/assets/menu.svg';
import { getTasksByDate, toggleTaskComplete } from '../shared/apis/task.api';
import type { Task as ApiTask } from '../shared/types/task.types';

interface DisplayTask {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  period: 'morning' | 'afternoon';
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
});

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function TasksPage() {
  const navigate = useNavigate();

  const [regularTasks, setRegularTasks] = useState<DisplayTask[]>([]);
  const [irregularTasks, setIrregularTasks] = useState<DisplayTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 업무 목록 조회
  const fetchTasks = useCallback(async () => {
    const todayDate = getTodayDateString();
    console.log('[TasksPage] fetchTasks 호출됨, date:', todayDate);
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTasksByDate(todayDate);
      console.log('[TasksPage] API 응답 전체:', JSON.stringify(response, null, 2));
      console.log('[TasksPage] response.details:', response.details);
      console.log('[TasksPage] regularTasks:', response.details?.regularTasks);
      console.log('[TasksPage] irregularTasks:', response.details?.irregularTasks);

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
      console.error('[TasksPage] API 에러:', err);
      setError('업무 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
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

  const morningTasks = regularTasks.filter(t => t.period === 'morning');
  const afternoonTasks = regularTasks.filter(t => t.period === 'afternoon');

  // Get current date
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
  const currentDate = `${year}년 ${month}월 ${date}일 (${dayOfWeek})`;

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="tasks">
      {/* Background Gradient */}
      <div className="absolute bg-gradient-to-b from-[#f8fbff] h-full left-0 to-[#ffffff] top-0 w-full" data-name="Background" />

      {/* Header */}
      <div className="relative bg-[#51a8ff] w-full shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]" data-name="Container">
        <div className="max-w-[39.3rem] mx-auto px-[2rem] h-[9.5rem] flex gap-[1.6rem] items-center">
          {/* Back Button */}
          <button
            onClick={() => navigate('/home')}
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
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={(id) => handleToggleComplete(id, true)}
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
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={(id) => handleToggleComplete(id, true)}
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
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={(id) => handleToggleComplete(id, false)}
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

        {/* Edit Button */}
        {!isLoading && !error && (
        <button
          onClick={() => navigate('/tasks/today/modify')}
          className="bg-[#51a8ff] h-[5.6rem] rounded-full shadow-[0rem_0.1rem_0.3rem_0rem_rgba(0,0,0,0.1),0rem_0.1rem_0.2rem_-0.1rem_rgba(0,0,0,0.1)] w-full flex items-center justify-center"
          data-name="Button"
        >
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[1.6rem] text-white">
            편집
          </p>
        </button>
        )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="tasks" />
    </div>
  );
}

// TaskItem Component
interface TaskItemProps {
  task: DisplayTask;
  onToggle: (id: number) => void;
}

function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="flex gap-[1.2rem] h-[8rem] items-center px-[0.8rem] rounded-[0.6rem] w-full border-b border-[#f0f0f0]" data-name="TaskItem">
      {/* Checkbox Button */}
      <button
        onClick={() => onToggle(task.id)}
        className="relative shrink-0 size-[2rem]"
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
      <div className="flex-1 flex flex-col gap-[0.8rem]" data-name="Container">
        <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[2.4rem] text-[1.6rem] ${
          task.completed
            ? 'line-through text-[#51a8ff]'
            : 'text-[#09121c]'
        }`}>
          {task.title}
        </p>
        <div className="flex gap-[0.8rem] items-center">
          <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.95rem] text-[1.3rem] text-gray-500">
            {task.time}
          </p>
        </div>
      </div>
    </div>
  );
}
