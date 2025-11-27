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

  const weekDays = [
    { day: '월', date: '11/1', hours: '1.5h', color: '#ff4444' },
    { day: '화', date: '11/2', hours: '', color: '' },
    { day: '수', date: '11/3', hours: '3h', color: '#51a8ff' },
    { day: '목', date: '11/4', hours: '2h', color: '#51a8ff' },
    { day: '금', date: '11/5', hours: '', color: '' },
  ];

  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Generate random style slots on mount
  useEffect(() => {
    const slots: Record<string, RandomStyle> = {};
    const styles: RandomStyle[] = ['white', 'pink', 'blue'];

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

    // Assign random styles
    selected.forEach(slot => {
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      slots[slot] = randomStyle;
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
    const baseClasses = 'absolute h-[17.996px] rounded-[3px] cursor-pointer transition-all duration-200';

    // Check for random style (only apply to available slots)
    const randomStyle = randomStyleSlots[slotKey];
    if (status === 'available' && randomStyle) {
      // Don't apply border/background classes here - use inline styles instead
      return `${baseClasses} ${isHovered ? 'shadow-sm' : ''}`;
    }

    switch (status) {
      case 'selected':
        return `${baseClasses} bg-[#51a8ff] border-[0.558px] border-[#51a8ff]`;
      case 'full':
        return `${baseClasses} bg-[#FEF2F2] border-[0.558px] border-[#ffc9c9] opacity-60 cursor-not-allowed`;
      case 'partial':
        return `${baseClasses} bg-orange-50 border-[0.558px] border-[#ffd6a7] ${isHovered ? 'opacity-100' : 'opacity-80'}`;
      case 'disabled':
        return `${baseClasses} bg-[#f5f5f5] border-[0.558px] border-[#e0e0e0] cursor-not-allowed`;
      default:
        return `${baseClasses} bg-white border-[0.558px] border-[#e0e0e0] ${isHovered ? 'border-[#51a8ff] shadow-sm' : ''}`;
    }
  };

  const getRandomStyle = (slotKey: string, isHovered: boolean): React.CSSProperties | undefined => {
    const randomStyle = randomStyleSlots[slotKey];
    if (!randomStyle) return undefined;

    switch (randomStyle) {
      case 'white':
        return {
          border: '0.558px solid #EAEAEA',
          background: '#FFF',
          borderColor: isHovered ? '#51a8ff' : '#EAEAEA'
        };
      case 'pink':
        return {
          border: '0.558px solid #FFC9C9',
          background: '#FEF2F2',
          opacity: isHovered ? 1 : 0.6
        };
      case 'blue':
        return {
          border: '0.558px solid #51A8FF',
          background: '#51A8FF'
        };
    }
  };

  const handleSlotClick = (dayIndex: number, time: string, status: SlotStatus) => {
    if (status === 'disabled' || status === 'full') {
      return;
    }
    onSlotClick(dayIndex, time);
  };

  // 위치 및 너비 계산
  const leftPositions = [0, 69.74, 141.77, 213.84, 286.16];
  const widths = [59.75, 62.036, 62.079, 62.324, 61.596];

  return (
    <div className="w-full" data-name="WeeklyTimeTable">
      <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] py-[16px] pl-[76px] pr-[16px]">
        {/* Header - Week Days */}
        <div className="relative h-[60px] mb-[12px]" data-name="WeekHeader">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="absolute top-0"
              style={{
                left: `${leftPositions[index]}px`,
                width: `${widths[index]}px`
              }}
            >
              <div className="flex flex-col items-center gap-[4px]">
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[13px] text-[#09121c]">
                  {day.day}
                </p>
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[11px] text-[#9ca3af]">
                  {day.date}
                </p>
                {day.hours && (
                  <p
                    className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[10px]"
                    style={{ color: day.color }}
                  >
                    {day.hours}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="relative">
          {times.map((time, timeIndex) => (
            <div
              key={time}
              className="relative h-[24px] mb-[4px]"
              data-name={`TimeRow-${time}`}
            >
              {/* Time Label */}
              <div className="absolute left-[-60px] top-[3px]">
                <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[11px] text-[#9ca3af]">
                  {time}
                </p>
              </div>

              {/* Day Slots */}
              {weekDays.map((_, dayIndex) => {
                const slotKey = `${dayIndex}-${time}`;
                const status = getSlotStatus(dayIndex, time);
                const isHovered = hoveredSlot === slotKey;
                const capacity = slotCapacity[slotKey];

                return (
                  <div
                    key={slotKey}
                    className="absolute"
                    style={{
                      left: `${leftPositions[dayIndex]}px`,
                      width: `${widths[dayIndex]}px`,
                      top: 0
                    }}
                  >
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
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-[#09121c] text-white text-[10px] rounded whitespace-nowrap z-10">
                          {status === 'disabled'
                            ? '점심시간'
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
