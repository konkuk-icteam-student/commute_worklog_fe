import { useState, useEffect } from 'react';

type SlotStatus = 'available' | 'selected' | 'full' | 'partial' | 'disabled';
type RandomStyle = 'white' | 'pink' | 'blue';

interface WeeklyTimeTableNewProps {
  selectedSlots?: string[];
  onSlotClick?: (day: number, time: string) => void;
  slotCapacity?: { [key: string]: { current: number; max: number } };
}

export default function WeeklyTimeTableNew({
  selectedSlots = [],
  onSlotClick = () => {},
  slotCapacity = {}
}: WeeklyTimeTableNewProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [randomStyleSlots, setRandomStyleSlots] = useState<Record<string, RandomStyle>>({});

  // Calculate hours per day based on selected slots (0.5h per slot)
  const calculateDayHours = (dayIndex: number) => {
    const count = selectedSlots.filter(slot => slot.startsWith(`${dayIndex}-`)).length;
    return count * 0.5;
  };

  const weekDays = [
    { day: '월', date: '11/1', hours: calculateDayHours(0) > 0 ? `${calculateDayHours(0)}h` : '', color: calculateDayHours(0) > 0 ? '#51a8ff' : '' },
    { day: '화', date: '11/2', hours: calculateDayHours(1) > 0 ? `${calculateDayHours(1)}h` : '', color: calculateDayHours(1) > 0 ? '#51a8ff' : '' },
    { day: '수', date: '11/3', hours: calculateDayHours(2) > 0 ? `${calculateDayHours(2)}h` : '', color: calculateDayHours(2) > 0 ? '#51a8ff' : '' },
    { day: '목', date: '11/4', hours: calculateDayHours(3) > 0 ? `${calculateDayHours(3)}h` : '', color: calculateDayHours(3) > 0 ? '#51a8ff' : '' },
    { day: '금', date: '11/5', hours: calculateDayHours(4) > 0 ? `${calculateDayHours(4)}h` : '', color: calculateDayHours(4) > 0 ? '#51a8ff' : '' },
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
        return `${baseClasses} bg-[#FEF2F2] border border-[#ffc9c9] opacity-60 cursor-not-allowed`;
      case 'partial':
        return `${baseClasses} cursor-pointer bg-orange-50 border border-[#ffd6a7] ${isHovered ? 'opacity-100' : 'opacity-80'}`;
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

  return (
    <div className="w-full" data-name="WeeklyTimeTable">
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

                return (
                  <div key={slotKey} className="relative">
                    <div
                      className={getSlotClasses(status, isHovered, slotKey)}
                      style={status === 'available' ? getRandomStyle(slotKey, isHovered) : undefined}
                      onClick={() => handleSlotClick(dayIndex, time, status)}
                      onMouseEnter={() => setHoveredSlot(slotKey)}
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
