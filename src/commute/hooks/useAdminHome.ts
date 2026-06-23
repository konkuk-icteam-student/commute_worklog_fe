import { useState, useEffect, useCallback } from 'react';
import { getAllScheduleHistory } from '../shared/apis/schedule.api';
import { getTasksByDate } from '../shared/apis/task.api';
import type { ScheduleHistoryItem } from '../shared/types/schedule.types';
import type { TasksByDateDetails } from '../shared/types/task.types';

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function useAdminHome() {
  const [schedules, setSchedules] = useState<ScheduleHistoryItem[]>([]);
  const [tasks, setTasks] = useState<TasksByDateDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const now = new Date();
    try {
      const [scheduleRes, taskRes] = await Promise.all([
        getAllScheduleHistory(now.getFullYear(), now.getMonth() + 1),
        getTasksByDate(formatDate(now)),
      ]);

      if (scheduleRes.isSuccess) {
        const todaySchedules = scheduleRes.details.histories.filter((s) =>
          isSameDay(new Date(s.start), now)
        );
        setSchedules(todaySchedules);
      }

      if (taskRes.isSuccess) {
        setTasks(taskRes.details);
      }
    } catch {
      // Silently handle errors - UI will show empty state
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 1 minute
  useEffect(() => {
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { schedules, tasks, isLoading, refetch: fetchData };
}
