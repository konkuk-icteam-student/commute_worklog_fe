import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import v from '@/worklog/shared/assets/v.svg';
import left from './left.svg';
import right from './right.svg';

interface DateRangePickerProps {
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
}

const DateRangePicker = ({ range, onRangeChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date?: Date) => {
    return date ? format(date, 'yyyy.MM.dd') : '';
  };

  const buttonText = range?.from
    ? `${formatDate(range.from)} ~ ${range.to ? formatDate(range.to) : '종료일 선택'}`
    : '날짜를 선택하세요';

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[48px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 hover:bg-gray-50"
      >
        <img
          src={v}
          alt="dropdown"
          className={`${isOpen ? 'rotate-180' : ''} transition-transform`}
        />
        <span className="text-[16px] text-[#464A4D]">{buttonText}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[56px] z-50 flex h-auto w-[320px] flex-col rounded-[8px] border border-[#E8EEF2] bg-white p-5 shadow-lg">
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex h-[36px] items-center rounded border border-[#E8EEF2] px-3 text-[14px] font-medium text-black">
              {range?.from ? format(range.from, 'yyyy년 MM월 dd일') : '시작일'}
            </div>
            <div className="flex h-[36px] items-center rounded border border-[#E8EEF2] px-3 text-[14px] font-medium text-[#8C9499]">
              {range?.to ? format(range.to, 'yyyy년 MM월 dd일') : '종료일'}
            </div>
          </div>

          <div className="flex justify-center">
            <style>{`
              .rdp {
                margin: 0;
                --rdp-cell-size: 32px;
                --rdp-accent-color: #3b82f6; 
                --rdp-background-color: #eff6ff; 
              }

              .rdp-day_button {
            font-size: 13px;
            }

              /* --- 헤더 전체 영역 (상대 위치 기준점) --- */
              .rdp-caption {
                    display: flex;
                    align-items: center;
                    justify-content: space-between; /* <  [라벨]  > */
                    width: 100%;
                    height: 32px;
                    margin-bottom: 16px;
                    position: static; /* relative 필요 없음 */
                    }

                    /* 가운데 연/월 텍스트 */
                    .rdp-caption_label {
                    position: static;        /* absolute 제거 */
                    transform: none;         /* translate 제거 */
                    font-size: 14px;         /* 2번째 사진 느낌이면 16~18 사이 추천 */
                    font-weight: 400;
                    color: #000;
                    margin-left: 15px;
                    padding: 0;
                    pointer-events: none;
                    text-align: center;
                    flex: 1;                 /* 가운데 영역이 남는 공간을 먹도록 */
                    }

                    /* 화살표 감싸는 영역 */
                    .rdp-nav {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    }

                    /* 왼쪽/오른쪽 버튼 */
                    .rdp-nav_button {
                    width: 32px;
                    height: 32px;
                    padding: 0;
                    background: transparent;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    }

                    .rdp-nav_button:hover {
                    background-color: #f3f4f6;
                    border-radius: 4px;
                    }

              /* --- 달력 범위 CSS --- */
              .rdp-day_selected { background-color: var(--rdp-accent-color); color: white; border-radius: 9999px; }
              .rdp-day_range_middle { background-color: var(--rdp-background-color) !important; color: #17191a !important; border-radius: 0 !important; }
              .rdp-day_range_start:not(.rdp-day_range_end) { background-color: var(--rdp-accent-color) !important; border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; border-top-left-radius: 9999px !important; border-bottom-left-radius: 9999px !important; }
              .rdp-day_range_end:not(.rdp-day_range_start) { background-color: var(--rdp-accent-color) !important; border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; border-top-right-radius: 9999px !important; border-bottom-right-radius: 9999px !important; }
              .rdp-day_today { font-weight: bold; color: var(--rdp-accent-color); }
            `}</style>

            <DayPicker
              mode="range"
              selected={range}
              onSelect={onRangeChange}
              locale={ko}
              className="text-[14px]"
              components={{
                Chevron: ({ orientation }) => {
                  if (orientation === 'left') {
                    return <img src={left} alt="이전 달" className="h-[18px] w-[18px]" />;
                  }
                  return <img src={right} alt="다음 달" className="h-[18px] w-[18px]" />;
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
