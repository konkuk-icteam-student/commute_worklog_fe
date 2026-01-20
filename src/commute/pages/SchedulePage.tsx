import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../shared/components/BottomNavigation';
import ScheduleCard from '../shared/components/ScheduleCard';

type SelectedCard = 'apply' | 'modify' | 'view' | null;

export default function SchedulePage() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);

  const handleApply = () => {
    setSelectedCard('apply');
    navigate('/schedule/apply');
  };

  const handleModify = () => {
    setSelectedCard('modify');
    navigate('/schedule/modify');
  };

  const handleView = () => {
    setSelectedCard('view');
    navigate('/schedule/view');
  };

  return (
    <div className="relative min-h-screen w-full bg-white" data-name="schedule">
      {/* Background Gradient */}
      <div
        className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#f8fbff] to-[#ffffff]"
        data-name="Background"
      />

      {/* Header */}
      <div
        className="relative w-full bg-[#51a8ff] shadow-[0rem_0.4rem_0.6rem_-0.4rem_rgba(0,0,0,0.1)]"
        data-name="Container"
      >
        <div className="mx-auto max-w-[39.3rem] px-[3.2rem] pb-[2.4rem] pt-[4.2rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <div data-name="Heading 1">
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] text-white">
                근로 시간 관리
              </p>
            </div>
            <div data-name="Paragraph">
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-[rgba(255,255,255,0.8)]">
                신청 · 변경 · 조회
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full py-[3.2rem] pb-[12rem]">
        <div className="mx-auto max-w-[39.3rem] px-[3.2rem]">
          <div className="flex flex-col gap-[2rem]">
            <ScheduleCard type="apply" selected={selectedCard === 'apply'} onClick={handleApply} />
            {/* 근로시간 수정 버튼 임시 주석 처리 */}
            {/* <ScheduleCard
              type="modify"
              selected={selectedCard === 'modify'}
              onClick={handleModify}
            /> */}
            <ScheduleCard type="view" selected={selectedCard === 'view'} onClick={handleView} />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="calendar" />
    </div>
  );
}
