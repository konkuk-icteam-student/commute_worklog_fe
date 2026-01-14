import { useState, useEffect, useCallback } from 'react';
import monthlyScheduleDates from '../../constants/monthlyScheduleDates.json';

type SlotStatus = 'available' | 'selected' | 'disabled';
type RandomStyle = 'white' | 'pink' | 'blue';

const TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

interface WeeklyTimeTableNewProps {
  selectedWeek?: number;
  selectedSlots?: string[];
  onSlotClick?: (day: number, time: string) => void;
  slotCapacityMap?: Map<string, number>; // 슬롯별 현재 신청 인원수
  maxCapacity?: number; // 최대 신청 가능 인원수
}

export default function WeeklyTimeTableNew({
  selectedWeek = 1,
  selectedSlots = [],
  onSlotClick = () => {},
  slotCapacityMap = new Map(),
  maxCapacity = 5
}: WeeklyTimeTableNewProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [randomStyleSlots, setRandomStyleSlots] = useState<Record<string, RandomStyle>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [draggedSlots, setDraggedSlots] = useState<Set<string>>(new Set());
  const [dragMode, setDragMode] = useState<'select' | 'deselect'>('select');

  // Calculate hours per day based on selected slots (0.5h per slot)
  const calculateDayHours = (dayIndex: number) => {
    const count = selectedSlots.filter(slot => slot.startsWith(`${dayIndex}-`)).length;
    return count * 0.5;
  };

  // Get dates for each week based on selectedWeek
  const getWeekDates = (week: number) => {
    // TODO: 나중에 동적으로 year/month 받아오기
    const year = '2026';
    const month = '1';

    const monthData = monthlyScheduleDates[year as keyof typeof monthlyScheduleDates]?.[month as keyof typeof monthlyScheduleDates['2026']];
    if (!monthData) return ['-', '-', '-', '-', '-'];

    const weekData = monthData.weeks.find(w => w.week === week);
    return weekData?.dates || ['-', '-', '-', '-', '-'];
  };

  const dates = getWeekDates(selectedWeek);
  const weekDays = [
    { day: '월', date: dates[0], hours: calculateDayHours(0) > 0 ? `${calculateDayHours(0)}h` : '', color: calculateDayHours(0) > 0 ? '#51a8ff' : '' },
    { day: '화', date: dates[1], hours: calculateDayHours(1) > 0 ? `${calculateDayHours(1)}h` : '', color: calculateDayHours(1) > 0 ? '#51a8ff' : '' },
    { day: '수', date: dates[2], hours: calculateDayHours(2) > 0 ? `${calculateDayHours(2)}h` : '', color: calculateDayHours(2) > 0 ? '#51a8ff' : '' },
    { day: '목', date: dates[3], hours: calculateDayHours(3) > 0 ? `${calculateDayHours(3)}h` : '', color: calculateDayHours(3) > 0 ? '#51a8ff' : '' },
    { day: '금', date: dates[4], hours: calculateDayHours(4) > 0 ? `${calculateDayHours(4)}h` : '', color: calculateDayHours(4) > 0 ? '#51a8ff' : '' },
  ];

  /**
   * 날짜 + 시간을 ISO 형식으로 변환하여 슬롯 키 생성
   * @param dayIndex 요일 인덱스 (0~4)
   * @param time 시작 시간 (e.g., "09:00")
   * @returns 슬롯 키 (e.g., "2026-01-11T09:00:00_2026-01-11T09:30:00")
   */
  const getSlotKeyForCapacity = (dayIndex: number, time: string): string => {
    const date = dates[dayIndex];
    if (date === '-') return '';

    // 시작 시간
    const startISO = `2026-01-${date.padStart(2, '0')}T${time}:00`;

    // 종료 시간 계산 (30분 후)
    const [hour, minute] = time.split(':').map(Number);
    let endHour = hour;
    let endMinute = minute + 30;
    if (endMinute >= 60) {
      endHour += 1;
      endMinute -= 60;
    }
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    const endISO = `2026-01-${date.padStart(2, '0')}T${endTime}:00`;

    return `${startISO}_${endISO}`;
  };

  /**
   * 특정 슬롯의 현재 신청 인원수 가져오기
   */
  const getSlotCapacity = (dayIndex: number, time: string): number => {
    const slotKey = getSlotKeyForCapacity(dayIndex, time);
    return slotCapacityMap.get(slotKey) || 0;
  };

  /**
   * 슬롯이 마감되었는지 확인
   */
  const isSlotFull = (dayIndex: number, time: string): boolean => {
    const currentCapacity = getSlotCapacity(dayIndex, time);
    return currentCapacity >= maxCapacity;
  };

  // Generate random style slots on mount
  useEffect(() => {
    const slots: Record<string, RandomStyle> = {};

    // Generate all available slot keys (excluding lunch time)
    const allSlots: string[] = [];
    for (let day = 0; day < 5; day++) {
      for (const time of TIMES) {
        if (time < '12:00' || time >= '13:00') { // Skip lunch time
          allSlots.push(`${day}-${time}`);
        }
      }
    }

    // Shuffle and pick 10 random slots
    const shuffled = allSlots.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

    // Assign random styles (only white)
    selected.forEach(slot => {
      slots[slot] = 'white';
    });

    setRandomStyleSlots(slots);
  }, []);

  const getSlotStatus = (dayIndex: number, time: string): SlotStatus => {
    const slotKey = `${dayIndex}-${time}`;

    // 12:00 ~ 13:00 시간대는 disabled
    if (time >= '12:00' && time < '13:00') {
      return 'disabled';
    }

    // 사용자가 이미 선택한 슬롯
    if (selectedSlots.includes(slotKey)) {
      return 'selected';
    }

    // 마감된 슬롯 (5명 다 찬 경우)
    if (isSlotFull(dayIndex, time)) {
      return 'disabled';
    }

    return 'available';
  };

  const getSlotClasses = (status: SlotStatus, isHovered: boolean, slotKey: string) => {
    const baseClasses = 'w-full h-[1.8rem] rounded-[0.3rem] transition-all duration-200';

    // Check for random style (only apply to available slots)
    const randomStyle = randomStyleSlots[slotKey];
    if (status === 'available' && randomStyle) {
      return `${baseClasses} cursor-pointer ${isHovered ? 'shadow-sm' : ''}`;
    }

    switch (status) {
      case 'selected':
        return `${baseClasses} cursor-pointer bg-[#51a8ff] border border-[#51a8ff]`;
      case 'disabled':
        return `${baseClasses} bg-[#f5f5f5] border border-[#e0e0e0] cursor-not-allowed`;
      default:
        return `${baseClasses} cursor-pointer bg-white border border-[#e0e0e0] ${isHovered ? 'border-[#51a8ff] shadow-sm' : ''}`;
    }
  };

  const getRandomStyle = (slotKey: string, isHovered: boolean): React.CSSProperties | undefined => {
    const randomStyle = randomStyleSlots[slotKey];
    if (!randomStyle) return undefined;

    // Only white style for available slots
    return {
      border: '1px solid #EAEAEA',
      background: '#FFF',
      borderColor: isHovered ? '#51a8ff' : '#EAEAEA'
    };
  };

  const handleMouseDown = (dayIndex: number, time: string, status: SlotStatus) => {
    // Disabled slots are not draggable
    if (status === 'disabled') {
      return;
    }

    const slotKey = `${dayIndex}-${time}`;
    const isCurrentlySelected = selectedSlots.includes(slotKey);

    setIsDragging(true);
    setDraggedSlots(new Set([slotKey]));
    setDragMode(isCurrentlySelected ? 'deselect' : 'select');
  };

  const handleMouseEnter = (dayIndex: number, time: string, status: SlotStatus) => {
    if (!isDragging) return;

    // Disabled slots cannot be dragged over
    if (status === 'disabled') {
      return;
    }

    const slotKey = `${dayIndex}-${time}`;
    setDraggedSlots(prev => new Set([...prev, slotKey]));
  };

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    // If only one slot was dragged, it's a simple click - just toggle it
    if (draggedSlots.size === 1) {
      const slotKey = Array.from(draggedSlots)[0];
      const [dayStr, time] = slotKey.split('-');
      const dayIndex = parseInt(dayStr);
      onSlotClick(dayIndex, time);
    } else {
      // Multiple slots dragged - apply based on drag mode
      draggedSlots.forEach(slotKey => {
        const [dayStr, time] = slotKey.split('-');
        const dayIndex = parseInt(dayStr);
        const isCurrentlySelected = selectedSlots.includes(slotKey);

        // Only toggle if needed based on drag mode
        if (dragMode === 'select' && !isCurrentlySelected) {
          onSlotClick(dayIndex, time);
        } else if (dragMode === 'deselect' && isCurrentlySelected) {
          onSlotClick(dayIndex, time);
        }
      });
    }

    // Reset drag state
    setIsDragging(false);
    setDraggedSlots(new Set());
  }, [isDragging, draggedSlots, dragMode, selectedSlots, onSlotClick]);

  // Add global mouseup listener to handle drag end anywhere
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, handleMouseUp]);

  return (
    <div className="w-full select-none" data-name="WeeklyTimeTable">
      <div className="bg-white rounded-[1.6rem] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] py-[1.6rem] pr-[1.6rem]">
        {/* Header - Week Days */}
        <div className="grid grid-cols-[6rem_1fr_1fr_1fr_1fr_1fr] gap-[0.4rem] mb-[1.2rem]" data-name="WeekHeader">
          <div></div>
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-[0.4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.3rem] text-[#09121c]">
                {day.day}
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.1rem] text-[#9ca3af]">
                {day.date}
              </p>
              {day.hours && (
                <p
                  className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1rem]"
                  style={{ color: day.color }}
                >
                  {day.hours}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-col gap-[0.4rem]">
          {TIMES.map((time) => (
            <div
              key={time}
              className="grid grid-cols-[6rem_1fr_1fr_1fr_1fr_1fr] gap-[0.4rem] h-[2.4rem]"
              data-name={`TimeRow-${time}`}
            >
              {/* Time Label - only show hourly times (not :30) */}
              <div className="flex items-center justify-end pr-[1rem]">
                {time.endsWith(':00') && (
                  <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.1rem] text-[#9ca3af]">
                    {time} -
                  </p>
                )}
              </div>

              {/* Day Slots */}
              {weekDays.map((_, dayIndex) => {
                const slotKey = `${dayIndex}-${time}`;
                const status = getSlotStatus(dayIndex, time);
                const isHovered = hoveredSlot === slotKey;
                const isDraggedOver = draggedSlots.has(slotKey);

                // 현재 신청 인원수
                const currentCapacity = getSlotCapacity(dayIndex, time);
                const isLunchTime = time >= '12:00' && time < '13:00';
                const isFull = isSlotFull(dayIndex, time);

                return (
                  <div key={slotKey} className="relative">
                    <div
                      className={`${getSlotClasses(status, isHovered, slotKey)} ${isDraggedOver ? 'ring-2 ring-[#51a8ff] ring-opacity-50' : ''} flex items-center justify-center`}
                      style={status === 'available' ? getRandomStyle(slotKey, isHovered) : undefined}
                      onMouseDown={() => handleMouseDown(dayIndex, time, status)}
                      onMouseEnter={() => {
                        setHoveredSlot(slotKey);
                        handleMouseEnter(dayIndex, time, status);
                      }}
                      onMouseLeave={() => setHoveredSlot(null)}
                      title={isLunchTime ? '점심시간' : isFull ? '마감' : status === 'selected' ? '선택됨' : `신청 가능 (${currentCapacity}/${maxCapacity})`}
                    >
                      {/* 인원수 표시 (선택되지 않은 available 슬롯에만) */}
                      {status === 'available' && currentCapacity > 0 && (
                        <span className="text-[0.8rem] text-[#9ca3af] font-['LINE_Seed_Sans_KR:Regular',sans-serif]">
                          {currentCapacity}/{maxCapacity}
                        </span>
                      )}

                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[0.1rem] px-[0.6rem] py-[0.3rem] bg-[#09121c] text-white text-[1rem] rounded whitespace-nowrap z-10">
                          {isLunchTime ? '점심시간' : isFull ? '마감됨' : status === 'selected' ? '선택됨' : `신청 가능 (${currentCapacity}/${maxCapacity}명)`}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
