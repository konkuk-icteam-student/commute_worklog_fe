import { useState, useEffect, useCallback } from 'react';
import { getTasksByDate, createTask, deleteTask } from '../../shared/apis/task.api';
import type { Task } from '../../shared/types/task.types';
import type { CreateTaskRequest } from '../../shared/types/task.types';

type TaskType = 'morning' | 'afternoon' | 'irregular';

const TASK_TYPE_LABELS: Record<TaskType, string> = {
  morning: '정기 업무(오전)',
  afternoon: '정기 업무(오후)',
  irregular: '비정기 업무',
};

function getToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getRoundedTime(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  const rounded = Math.ceil(now.getMinutes() / 30) * 30;
  now.setMinutes(rounded, 0, 0);
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${h}:${m}:00`;
}

export default function ManagerTaskManager() {
  const [taskType, setTaskType] = useState<TaskType>('morning');
  const [newTaskName, setNewTaskName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [morningTasks, setMorningTasks] = useState<Task[]>([]);
  const [afternoonTasks, setAfternoonTasks] = useState<Task[]>([]);
  const [irregularTasks, setIrregularTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const res = await getTasksByDate(getToday());
      if (res.isSuccess) {
        setMorningTasks(res.details.regularTasks.morning);
        setAfternoonTasks(res.details.regularTasks.afternoon);
        setIrregularTasks(res.details.irregularTasks);
      } else {
        setError(res.message || '업무 목록을 불러올 수 없습니다.');
      }
    } catch {
      setError('업무 목록을 불러올 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async () => {
    if (!newTaskName.trim()) return;

    const request: CreateTaskRequest = {
      title: newTaskName.trim(),
      taskDate: getToday(),
      taskType: taskType === 'irregular' ? 'TT02' : 'TT01',
      taskTime: taskType === 'morning' ? '09:00:00'
        : taskType === 'afternoon' ? '13:00:00'
        : getRoundedTime(),
    };

    try {
      await createTask(request);
      setNewTaskName('');
      await fetchTasks();
    } catch {
      alert('업무 추가에 실패했습니다.');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm('업무를 삭제하시겠습니까?')) return;
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch {
      alert('업무 삭제에 실패했습니다.');
    }
  };

  const handleSelectType = (type: TaskType) => {
    setTaskType(type);
    setDropdownOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-[24px] w-full">
        <div className="flex items-center justify-center w-full h-[200px]">
          <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#99a1af]">업무 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-[24px] w-full">
        <div className="flex items-center justify-center w-full h-[200px]">
          <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#fb2c36]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-[24px] w-full">
      {/* Input area */}
      <div className="flex w-full items-end justify-center gap-[10px]">
        {/* Dropdown */}
        <div className="relative h-[50px] w-[175px] shrink-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative h-[50px] w-[175px] rounded-[10px] bg-white cursor-pointer text-left"
          >
            <div className="flex size-full items-center justify-between overflow-clip rounded-[inherit] px-[16px] py-[12px]">
              <span className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#09121c] text-nowrap">
                {TASK_TYPE_LABELS[taskType]}
              </span>
              <svg className={`size-[22px] shrink-0 transition-transform ${dropdownOpen ? 'rotate-[90deg]' : 'rotate-[270deg]'}`} fill="none" viewBox="0 0 22 22">
                <path d="M8.25 5.5L13.75 11L8.25 16.5" stroke="#09121C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute top-[54px] left-0 w-[175px] bg-white rounded-[10px] border border-[#e0e0e0] shadow-lg z-50">
              {(['morning', 'afternoon', 'irregular'] as TaskType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelectType(type)}
                  className={`w-full px-[16px] py-[12px] text-left font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#09121c] hover:bg-[rgba(81,168,255,0.1)] first:rounded-t-[10px] last:rounded-b-[10px] ${taskType === type ? 'bg-[rgba(81,168,255,0.1)] font-bold' : ''}`}
                >
                  {TASK_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text input */}
        <div className="relative h-[50px] w-[488px] shrink-0 rounded-[10px] bg-white">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value.slice(0, 16))}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
            placeholder="새 업무 추가(최대 16자)"
            maxLength={16}
            className="size-full rounded-[inherit] px-[16px] py-[12px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#09121c] placeholder:text-[#cdcdcd] outline-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[10px] border-[0.542px] border-solid border-[#e0e0e0]"
          />
        </div>

        {/* Add button */}
        <button
          onClick={handleAddTask}
          className="flex size-[50px] shrink-0 items-center justify-center rounded-[10px] bg-[#51a8ff] cursor-pointer"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
            <path d="M4.16667 10H15.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66607" />
            <path d="M10 4.16667V15.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66607" />
          </svg>
        </button>
      </div>

      {/* Task lists */}
      <div className="flex w-full flex-col gap-[32px]">
        {/* 정기 업무 */}
        <div className="flex w-full flex-col gap-[16px]">
          {/* Header */}
          <div className="flex items-center gap-[8px]">
            <div className="flex size-[32px] items-center justify-center rounded-[10px] bg-[rgba(81,168,255,0.1)]">
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M8.664 3.332H14" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M8.664 8H14" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M8.664 12.664H14" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M2 8L3.333 9.333L5.333 6.667" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M2 12.664L3.333 14L5.333 11.333" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M2 3.332L3.333 4.665L5.333 2" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
              </svg>
            </div>
            <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] text-[#09121c]">정기 업무</p>
          </div>

          {/* 오전 */}
          <div className="flex w-full flex-col gap-[8px]">
            <p className="pl-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#09121c] opacity-60">오전</p>
            <div className="border-l-[1.6px] border-[rgba(81,168,255,0.2)] pl-[18px]">
              {morningTasks.length === 0 ? (
                <p className="py-[12px] px-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#99a1af]">오전 업무가 없습니다.</p>
              ) : (
                morningTasks.map((task) => (
                  <TaskItem key={task.taskId} task={task} onDelete={() => handleDeleteTask(task.taskId)} />
                ))
              )}
            </div>
          </div>

          {/* 오후 */}
          <div className="flex w-full flex-col gap-[8px]">
            <p className="pl-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#09121c] opacity-60">오후</p>
            <div className="border-l-[1.6px] border-[rgba(81,168,255,0.2)] pl-[18px]">
              {afternoonTasks.length === 0 ? (
                <p className="py-[12px] px-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#99a1af]">오후 업무가 없습니다.</p>
              ) : (
                afternoonTasks.map((task) => (
                  <TaskItem key={task.taskId} task={task} onDelete={() => handleDeleteTask(task.taskId)} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* 비정기 업무 */}
        <div className="flex w-full flex-col gap-[16px]">
          {/* Header */}
          <div className="flex items-center gap-[8px]">
            <div className="flex size-[32px] items-center justify-center rounded-[10px] bg-[rgba(156,163,175,0.1)]">
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M8.664 3.332H14" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M8.664 8H14" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M8.664 12.664H14" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M2 8L3.333 9.333L5.333 6.667" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M2 12.664L3.333 14L5.333 11.333" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                <path d="M2 3.332L3.333 4.665L5.333 2" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
              </svg>
            </div>
            <p className="whitespace-nowrap font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[16px] text-[#09121c]">비정기 업무</p>
          </div>

          <div className="border-l-[1.6px] border-[rgba(156,163,175,0.2)] pl-[18px]">
            {irregularTasks.length === 0 ? (
              <p className="py-[12px] px-[8px] font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[14px] text-[#99a1af]">비정기 업무가 없습니다.</p>
            ) : (
              irregularTasks.map((task) => (
                <TaskItem key={task.taskId} task={task} onDelete={() => handleDeleteTask(task.taskId)} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task, onDelete }: { task: Task; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-[12px] rounded-[6px] px-[8px] py-[12px] border-b border-[#f0f0f0]">
      {/* Checkbox (read-only) */}
      <div className="relative size-[20px] shrink-0">
        {task.isCompleted ? (
          <svg className="size-full" viewBox="0 0 20 20" fill="none">
            <path d="M3.33206 2.49902H16.6607C17.1207 2.49902 17.4937 2.87199 17.4937 3.33206V16.6607C17.4937 17.1207 17.1207 17.4937 16.6607 17.4937H3.33206C2.87199 17.4937 2.49902 17.1207 2.49902 16.6607V3.33206C2.49902 2.87199 2.87199 2.49902 3.33206 2.49902ZM4.1651 4.1651V15.8276H15.8276V4.1651H4.1651Z" fill="#EAEAEA" />
            <path d="M9.47565 10.9764L17.1465 3.33203L18.3267 4.50809L9.47565 13.3285L4.16504 8.03628L5.34518 6.86024L9.47565 10.9764Z" fill="#51A8FF" />
          </svg>
        ) : (
          <svg className="size-full" viewBox="0 0 20 20" fill="none">
            <path d="M3.33206 2.49902H16.6607C17.1207 2.49902 17.4937 2.87199 17.4937 3.33206V16.6607C17.4937 17.1207 17.1207 17.4937 16.6607 17.4937H3.33206C2.87199 17.4937 2.49902 17.1207 2.49902 16.6607V3.33206C2.49902 2.87199 2.87199 2.49902 3.33206 2.49902ZM4.1651 4.1651V15.8276H15.8276V4.1651H4.1651Z" fill="#EAEAEA" />
          </svg>
        )}
      </div>

      {/* Task name */}
      <div className="flex-1 min-w-0">
        <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] leading-[24px] truncate ${task.isCompleted ? 'text-[#51a8ff] line-through' : 'text-[#09121c]'}`}>
          {task.title}
        </p>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="shrink-0 w-[98px] h-[42px] flex items-center justify-center rounded-[10px] border border-[#e0e0e0] bg-white cursor-pointer"
      >
        <span className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[16px] text-[#09121c]">삭제</span>
      </button>
    </div>
  );
}
