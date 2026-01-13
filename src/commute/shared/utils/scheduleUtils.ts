import type { TimeSlot, WorkSchedule } from '../types/schedule.types';
import monthlyScheduleDates from '../../constants/monthlyScheduleDates.json';

/**
 * 날짜 문자열 (M/D 형식)을 YYYY-MM-DD 형식으로 변환
 * @param dateStr "1/5" 형식의 날짜 문자열
 * @param year 연도
 * @returns "2025-01-05" 형식의 날짜 문자열
 */
export const parseDate = (dateStr: string, year: number): string | null => {
  if (dateStr === '-') return null;

  const [month, day] = dateStr.split('/').map(Number);
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDay}`;
};

/**
 * 시간 문자열을 30분 단위로 더한 결과를 반환
 * @param time "10:00" 형식의 시간 문자열
 * @param slots 더할 슬롯 개수 (1 slot = 30분)
 * @returns "10:30" 형식의 시간 문자열
 */
export const addTimeSlots = (time: string, slots: number): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + slots * 30;

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
};

/**
 * 두 시간 문자열의 차이를 30분 단위로 반환
 * @param time1 "10:00" 형식
 * @param time2 "10:30" 형식
 * @returns 슬롯 개수 (1 = 30분)
 */
export const getTimeSlotDiff = (time1: string, time2: string): number => {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);

  const totalMinutes1 = h1 * 60 + m1;
  const totalMinutes2 = h2 * 60 + m2;

  return (totalMinutes2 - totalMinutes1) / 30;
};

/**
 * 선택된 슬롯들을 API 요청 형식의 TimeSlot 배열로 변환
 * 연속된 슬롯들은 하나의 TimeSlot으로 병합됩니다.
 *
 * @param selectedSlots "0-10:00" 형식의 슬롯 배열
 * @param selectedWeek 선택된 주차 (1-5)
 * @param year 연도 (기본값: 2026)
 * @param month 월 (기본값: 1)
 * @returns TimeSlot 배열
 */
export const convertSlotsToTimeSlots = (
  selectedSlots: string[],
  selectedWeek: number,
  year: number = 2026,
  month: number = 1
): TimeSlot[] => {
  // monthlyScheduleDates에서 날짜 정보 가져오기
  const monthData =
    monthlyScheduleDates[year.toString() as keyof typeof monthlyScheduleDates]?.[
      month.toString() as keyof (typeof monthlyScheduleDates)['2026']
    ];

  if (!monthData) {
    console.error('Month data not found');
    return [];
  }

  const weekData = monthData.weeks.find((w) => w.week === selectedWeek);
  if (!weekData) {
    console.error('Week data not found');
    return [];
  }

  const dates = weekData.dates;

  // dayIndex별로 그룹화
  const slotsByDay: Record<number, string[]> = {};

  selectedSlots.forEach((slotKey) => {
    const [dayIndexStr, time] = slotKey.split('-');
    const dayIndex = parseInt(dayIndexStr);

    if (!slotsByDay[dayIndex]) {
      slotsByDay[dayIndex] = [];
    }
    slotsByDay[dayIndex].push(time);
  });

  const timeSlots: TimeSlot[] = [];

  // 각 날짜별로 처리
  Object.entries(slotsByDay).forEach(([dayIndexStr, times]) => {
    const dayIndex = parseInt(dayIndexStr);
    const dateStr = dates[dayIndex];

    // "-" 날짜는 건너뛰기
    if (dateStr === '-') return;

    const fullDate = parseDate(dateStr, year);
    if (!fullDate) return;

    // 시간순으로 정렬
    const sortedTimes = times.sort();

    // 연속된 슬롯들을 병합
    let currentStart: string | null = null;
    let currentEnd: string | null = null;

    sortedTimes.forEach((time, index) => {
      if (currentStart === null) {
        // 첫 번째 슬롯
        currentStart = time;
        currentEnd = addTimeSlots(time, 1);
      } else {
        // 현재 슬롯이 이전 슬롯과 연속되는지 확인
        const diff = getTimeSlotDiff(currentEnd!, time);

        if (diff === 0) {
          // 연속된 슬롯 - 종료 시간 업데이트
          currentEnd = addTimeSlots(time, 1);
        } else {
          // 연속되지 않음 - 이전 슬롯 저장하고 새로 시작
          timeSlots.push({
            start: `${fullDate}T${currentStart}:00`,
            end: `${fullDate}T${currentEnd}:00`,
          });

          currentStart = time;
          currentEnd = addTimeSlots(time, 1);
        }
      }

      // 마지막 슬롯인 경우 저장
      if (index === sortedTimes.length - 1 && currentStart && currentEnd) {
        timeSlots.push({
          start: `${fullDate}T${currentStart}:00`,
          end: `${fullDate}T${currentEnd}:00`,
        });
      }
    });
  });

  return timeSlots;
};

/**
 * WorkSchedule 배열을 selectedSlots 형식으로 변환
 *
 * @param schedules WorkSchedule 배열
 * @param selectedWeek 현재 선택된 주차
 * @param year 연도
 * @param month 월
 * @returns selectedSlots 배열 ("0-10:00" 형식)
 */
export const convertSchedulesToSlots = (
  schedules: WorkSchedule[],
  selectedWeek: number,
  year: number,
  month: number
): string[] => {
  const slots: string[] = [];

  // 해당 주차의 날짜 정보 가져오기
  const monthData =
    monthlyScheduleDates[year.toString() as keyof typeof monthlyScheduleDates]?.[
      month.toString() as keyof (typeof monthlyScheduleDates)['2026']
    ];

  if (!monthData) return [];

  const weekData = monthData.weeks.find((w) => w.week === selectedWeek);
  if (!weekData) return [];

  const weekDates = weekData.dates; // ["1/12", "1/13", "1/14", "1/15", "1/16"]

  schedules.forEach((schedule) => {
    // start: "2026-01-23T09:00:00"에서 날짜 추출
    const [datePart, timePart] = schedule.start.split('T');
    const [yearStr, monthStr, dayStr] = datePart.split('-');
    const dateStr = `${parseInt(monthStr)}/${parseInt(dayStr)}`; // "1/23"

    // 해당 날짜가 현재 주차에 있는지 확인
    const dayIndex = weekDates.indexOf(dateStr);
    if (dayIndex === -1) return; // 현재 주차가 아니면 건너뛰기

    // start와 end에서 시간 추출
    const startTime = schedule.start.split('T')[1].slice(0, 5); // "09:00:00" -> "09:00"
    const endTime = schedule.end.split('T')[1].slice(0, 5); // "11:00:00" -> "11:00"

    // startTime부터 endTime까지 30분 단위로 슬롯 생성
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startTotalMin = startHour * 60 + startMin;
    const endTotalMin = endHour * 60 + endMin;

    for (let min = startTotalMin; min < endTotalMin; min += 30) {
      const hour = Math.floor(min / 60);
      const minute = min % 60;
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      slots.push(`${dayIndex}-${timeStr}`);
    }
  });

  return slots;
};
