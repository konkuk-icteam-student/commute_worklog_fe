import { useState, useEffect, useCallback } from 'react';
import monthlyScheduleDates from '../../constants/monthlyScheduleDates.json';

type SlotStatus = 'available' | 'selected' | 'full' | 'partial' | 'disabled';
type RandomStyle = 'white' | 'pink' | 'blue';

interface WeeklyTimeTableNewProps {
  selectedWeek?: number;
  selectedSlots?: string[];
  onSlotClick?: (day: number, time: string) => void;
  slotCapacity?: { [key: string]: { current: number; max: number } };
}

export default function WeeklyTimeTableNew({
  selectedWeek = 1,
  selectedSlots = [],
  onSlotClick = () => {},
  slotCapacity = {}
}: WeeklyTimeTableNewProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [randomStyleSlots, setRandomStyleSlots] = useState<Record<string, RandomStyle>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSlot, setDragStartSlot] = useState<string | null>(null);
  const [draggedSlots, setDraggedSlots] = useState<Set<string>>(new Set());
  const [dragMode, setDragMode] = useState<'select' | 'deselect'>('select');

  // Calculate hours per day based on selected slots (0.5h per slot)
  const calculateDayHours = (dayIndex: number) => {
    const count = selectedSlots.filter(slot => slot.startsWith(`${dayIndex}-`)).length;
    return count * 0.5;
  };

  // Get dates for each week based on selectedWeek
  const getWeekDates = (week: number) => {
    // TODO: 현재는 2025년 1월 하드코딩, 나중에 동적으로 year/month 받아오기
    const year = '2025';
    const month = '1';

    const monthData = monthlyScheduleDates[year as keyof typeof monthlyScheduleDates]?.[month as keyof typeof monthlyScheduleDates['2025']];
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

  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Generate random style slots on mount
  useEffect(() => {
    const slots: Record<string, RandomStyle> = {};
    const styles: RandomStyle[] = ['white']; // Only white for available slots

    // Generate all available slot keys (excluding lunch time)
    const allSlots: string[] = [];
    for (let day = 0; day < 5; day++) {
      for (const time of times) {
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
    const capacity = slotCapacity[slotKey];

    // 12:00 ~ 13:00 시간대는 disabled
    if (time >= '12:00' && time < '13:00') {
      return 'disabled';
    }

    if (selectedSlots.includes(slotKey)) {
      return 'selected';
    }

    if (capacity) {
      if (capacity.current >= capacity.max) {
        return 'full';
      }
      if (capacity.current > 0) {
        return 'partial';
      }
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
      case 'full':
        return `${baseClasses} bg-[#FFE2E2] border border-[#FEC9C9] opacity-60 cursor-not-allowed`;
      case 'partial':
        return `${baseClasses} cursor-pointer bg-[#FEF2F2] border border-[#FFC9C9] ${isHovered ? 'opacity-100' : 'opacity-80'}`;
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

  const handleSlotClick = (dayIndex: number, time: string, status: SlotStatus) => {
    // Disabled and full slots are not clickable
    if (status === 'disabled' || status === 'full') {
      return;
    }

    onSlotClick(dayIndex, time);
  };

  const handleMouseDown = (dayIndex: number, time: string, status: SlotStatus) => {
    // Disabled and full slots are not draggable
    if (status === 'disabled' || status === 'full') {
      return;
    }

    const slotKey = `${dayIndex}-${time}`;
    const isCurrentlySelected = selectedSlots.includes(slotKey);

    setIsDragging(true);
    setDragStartSlot(slotKey);
    setDraggedSlots(new Set([slotKey]));
    setDragMode(isCurrentlySelected ? 'deselect' : 'select');
  };

  const handleMouseEnter = (dayIndex: number, time: string, status: SlotStatus) => {
    if (!isDragging) return;

    // Disabled and full slots cannot be dragged over
    if (status === 'disabled' || status === 'full') {
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
    setDragStartSlot(null);
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
          {times.map((time) => (
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
                const capacity = slotCapacity[slotKey];

                const isDraggedOver = draggedSlots.has(slotKey);

                return (
                  <div key={slotKey} className="relative">
                    <div
                      className={`${getSlotClasses(status, isHovered, slotKey)} ${isDraggedOver ? 'ring-2 ring-[#51a8ff] ring-opacity-50' : ''}`}
                      style={status === 'available' ? getRandomStyle(slotKey, isHovered) : undefined}
                      onMouseDown={() => handleMouseDown(dayIndex, time, status)}
                      onMouseEnter={() => {
                        setHoveredSlot(slotKey);
                        handleMouseEnter(dayIndex, time, status);
                      }}
                      onMouseLeave={() => setHoveredSlot(null)}
                      title={
                        capacity
                          ? `${capacity.current}/${capacity.max}명 신청`
                          : status === 'disabled'
                          ? '점심시간'
                          : '신청 가능'
                      }
                    >
                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[0.1rem] px-[0.2rem] py-[0.1rem] bg-[#09121c] text-white text-[1rem] rounded whitespace-nowrap z-10">
                          {status === 'disabled'
                            ? '점심시간'
                            : status === 'full'
                            ? '5/5명'
                            : status === 'partial'
                            ? '4/5명'
                            : `${capacity?.current || 0}/${capacity?.max || 5}명`
                          }
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
