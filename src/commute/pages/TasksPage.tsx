import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../shared/components/BottomNavigation';
import ClockIcon from '../shared/assets/clock.svg';
import MenuIcon from '../shared/assets/menu.svg';

interface Task {
  id: number;
  title: string;
  assignee: string;
  time: string;
  completed: boolean;
  type: 'regular' | 'irregular';
  period: 'morning' | 'afternoon';
}

export default function TasksPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: '신문지 가져오기', assignee: '홍길동', time: '09:00', completed: true, type: 'regular', period: 'morning' },
    { id: 2, title: '커피머신 청소', assignee: '김길동', time: '09:30', completed: false, type: 'regular', period: 'morning' },
    { id: 3, title: '싱크대 청소', assignee: '이길동', time: '10:00', completed: true, type: 'regular', period: 'morning' },
    { id: 4, title: '회의실 청소', assignee: '박길동', time: '10:30', completed: true, type: 'regular', period: 'morning' },
    { id: 5, title: '바닥 쓸기', assignee: '홍길동', time: '14:00', completed: false, type: 'regular', period: 'afternoon' },
    { id: 6, title: '바닥 닦기', assignee: '김길동', time: '14:30', completed: true, type: 'regular', period: 'afternoon' },
    { id: 7, title: '쓰레기통 비우기', assignee: '이길동', time: '15:00', completed: true, type: 'regular', period: 'afternoon' },
    { id: 8, title: '물티슈로 먼지 쌓이는 곳 닦기', assignee: '박길동', time: '15:30', completed: true, type: 'regular', period: 'afternoon' },
    { id: 9, title: '기록물 정리', assignee: '홍길동', time: '16:00', completed: true, type: 'irregular', period: 'afternoon' },
  ]);

  const toggleTaskComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const regularTasks = tasks.filter(t => t.type === 'regular');
  const morningTasks = regularTasks.filter(t => t.period === 'morning');
  const afternoonTasks = regularTasks.filter(t => t.period === 'afternoon');
  const irregularTasks = tasks.filter(t => t.type === 'irregular');

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
        {/* Regular Tasks Section */}
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
                {morningTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskComplete}
                  />
                ))}
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
                {afternoonTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskComplete}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Irregular Tasks Section */}
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
              {irregularTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTaskComplete}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => navigate('/tasks/today/modify')}
          className="bg-[#51a8ff] h-[5.6rem] rounded-full shadow-[0rem_0.1rem_0.3rem_0rem_rgba(0,0,0,0.1),0rem_0.1rem_0.2rem_-0.1rem_rgba(0,0,0,0.1)] w-full flex items-center justify-center"
          data-name="Button"
        >
          <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[2.4rem] text-[1.6rem] text-white">
            편집
          </p>
        </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="tasks" />
    </div>
  );
}

// TaskItem Component
interface TaskItemProps {
  task: Task;
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
            {task.assignee}
          </p>
          <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[1.95rem] text-[1.3rem] text-gray-500">
            {task.time}
          </p>
        </div>
      </div>
    </div>
  );
}
