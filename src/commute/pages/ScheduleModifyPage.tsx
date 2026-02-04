import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import svgPathsModify from '../shared/assets/svgPathsModify';

type FilterTab = 'all' | 'pending' | 'approved' | 'rejected';

interface ModificationRequest {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  statusLabel: string;
  statusDescription: string;
  applicationDate: string;
  modificationReason: string;
}

// Default mock data
const DEFAULT_REQUESTS: ModificationRequest[] = [
  {
    id: 'ID2025101534',
    status: 'pending',
    statusLabel: '승인 대기 중',
    statusDescription: '관리자가 검토 중입니다',
    applicationDate: '2025년 10월 15일 09:15',
    modificationReason: '개인 사정으로 시간 조정이 필요합니다.',
  },
  {
    id: 'ID2025101535',
    status: 'approved',
    statusLabel: '수정 요청 승인됨',
    statusDescription: '변경 사항이 적용되었습니다',
    applicationDate: '2025년 10월 14일 14:20',
    modificationReason: '개인 사정으로 시간 조정이 필요합니다.',
  },
  {
    id: 'ID2025101536',
    status: 'rejected',
    statusLabel: '수정 요청 거부됨',
    statusDescription: '다시 신청해주세요',
    applicationDate: '2025년 10월 13일 10:30',
    modificationReason: '개인 사정으로 시간 조정이 필요합니다.',
  },
  {
    id: 'ID2025101537',
    status: 'approved',
    statusLabel: '수정 요청 승인됨',
    statusDescription: '변경 사항이 적용되었습니다',
    applicationDate: '2025년 10월 12일 16:45',
    modificationReason: '개인 사정으로 시간 조정이 필요합니다.',
  },
];

const STORAGE_KEY = 'modificationRequests';

export default function ScheduleModifyPage() {
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Load data from localStorage or use default
  const [modificationRequests, setModificationRequests] = useState<ModificationRequest[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_REQUESTS;
  });

  // Save to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modificationRequests));
  }, [modificationRequests]);

  const filteredRequests = modificationRequests.filter(req => {
    if (filterTab === 'all') return true;
    return req.status === filterTab;
  });

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-[#fff7ed]',
          border: 'border-[#ffd6a7]',
          titleColor: 'text-[#ca3500]',
          descColor: 'text-[#f54900]',
        };
      case 'approved':
        return {
          bg: 'bg-[#f0fdf4]',
          border: 'border-[#b9f8cf]',
          titleColor: 'text-[#008236]',
          descColor: 'text-[#00a63e]',
        };
      case 'rejected':
        return {
          bg: 'bg-[#fef2f2]',
          border: 'border-[#ffc9c9]',
          titleColor: 'text-[#c10007]',
          descColor: 'text-[#e7000b]',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          titleColor: 'text-gray-900',
          descColor: 'text-gray-600',
        };
    }
  };

  const handleCancelRequest = () => {
    // Find the most recent pending request (first pending in the list)
    const pendingRequestIndex = modificationRequests.findIndex(req => req.status === 'pending');

    if (pendingRequestIndex !== -1) {
      const canceledRequest = modificationRequests[pendingRequestIndex];
      console.log('요청 취소됨:', canceledRequest.id);

      // Remove the pending request from the list
      setModificationRequests(prev =>
        prev.filter((_, index) => index !== pendingRequestIndex)
      );
    }

    setShowCancelModal(false);
  };

  const handleModifySchedule = () => {
    // Navigate to schedule edit page
    navigate('/schedule/edit');
  };

  // Get the most recent request (first in the list)
  const mostRecentRequest = modificationRequests[0];
  const showModifyButton = mostRecentRequest?.status === 'approved';

  return (
    <div className="bg-white relative min-h-screen w-full" data-name="scheduleModify">
      {/* Background Gradient */}
      <div className="absolute bg-gradient-to-b from-[#f8fbff] to-[#ffffff] inset-0 -z-10" data-name="Background" />

      {/* Header */}
      <div className="w-full bg-[#51a8ff] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Container">
        <div className="max-w-[39.3rem] mx-auto px-[3.2rem] py-[2.4rem]">
          <div className="flex items-center gap-[1.6rem]">
            {/* Back Button */}
            <button
              onClick={() => navigate('/schedule')}
              className="shrink-0 size-[4rem] flex items-center justify-center"
              data-name="Button"
            >
              <svg className="size-[2.4rem]" fill="none" viewBox="0 0 24 24">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex flex-col gap-[0.4rem]">
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] text-white">
                근로 시간 수정
              </p>
              <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.95rem] text-[rgba(255,255,255,0.8)]">
                10월
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="w-full overflow-y-auto pb-[10rem]">
        <div className="max-w-[39.3rem] mx-auto px-[2.4rem] pt-[2rem] flex flex-col gap-[1.2rem]">
          {/* Info Alert */}
          <div className="w-full bg-[rgba(81,168,255,0.05)] border border-[rgba(81,168,255,0.2)] rounded-[1rem] px-[1.2rem] py-[0.8rem] flex items-center gap-[0.8rem]" data-name="Container">
            <svg className="shrink-0 size-[1.4rem]" fill="none" viewBox="0 0 14 14">
              <path d={svgPathsModify.p2ee58b00} stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
              <path d="M7 4.67V7" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
              <path d="M7 9.33H7.006" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
            </svg>
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.2rem] leading-[1.8rem] text-[#09121c] opacity-70">
              수정 요청 승인 대기 중 · 동시 최대 요청 1건
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-[1rem] w-full" data-name="Container">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => {
              const isActive = filterTab === tab;
              const labels: Record<FilterTab, string> = {
                all: '전체',
                pending: '대기중',
                approved: '승인됨',
                rejected: '거부됨',
              };
              return (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`h-[3.6rem] px-[1.6rem] rounded-[4.4rem] transition-all duration-200 ${
                    isActive
                      ? 'bg-[#51a8ff] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)]'
                      : 'bg-white shadow-[0px_4px_25px_0px_rgba(5,6,24,0.05)]'
                  }`}
                  data-name="Button"
                >
                  <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.3rem] leading-[1.2rem] tracking-[0.021rem] ${
                    isActive ? 'text-white' : 'text-[#09121c]'
                  }`}>
                    {labels[tab]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Request Cards */}
          {filteredRequests.map((request, index) => {
            const colors = getStatusColors(request.status);
            return (
              <div key={index} className="w-full bg-white rounded-[1.6rem] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] p-[2rem]">
                {/* Header with ID and Arrow */}
                <div className="flex items-center justify-between mb-[1.2rem]">
                  <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.3rem] leading-[1.95rem] text-[#09121c]">
                    {request.id}
                  </p>
                  <svg className="size-[1.6rem] rotate-[-90deg]" fill="none" viewBox="0 0 16 16">
                    <path d={svgPathsModify.p351ca610} stroke="#09121C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                  </svg>
                </div>

                <div className="flex flex-col gap-[0.8rem]">
                  {/* Status Badge */}
                  <div className={`${colors.bg} border ${colors.border} rounded-[1rem] px-[1.2rem] py-[0.8rem]`}>
                    <p className={`font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.1rem] leading-[1.65rem] ${colors.titleColor}`}>
                      {request.statusLabel}
                    </p>
                    <p className={`font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1rem] leading-[1.5rem] ${colors.descColor}`}>
                      {request.statusDescription}
                    </p>
                  </div>

                  {/* Application Date */}
                  <div className="bg-[#f9fafb] rounded-[1rem] px-[1.2rem] py-[0.8rem]">
                    <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1rem] leading-[1.5rem] text-[#09121c]">
                      신청일
                    </p>
                    <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.1rem] leading-[1.65rem] text-[#09121c] opacity-70">
                      {request.applicationDate}
                    </p>
                  </div>

                  {/* Modification Reason */}
                  <div className="bg-[#f9fafb] rounded-[1rem] px-[1.2rem] py-[0.8rem]">
                    <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1rem] leading-[1.5rem] text-[#09121c]">
                      수정 사유
                    </p>
                    <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.1rem] leading-[1.65rem] text-[#09121c] opacity-70">
                      {request.modificationReason}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Action Button - Cancel or Modify based on most recent request status */}
          <button
            onClick={showModifyButton ? handleModifySchedule : () => setShowCancelModal(true)}
            className="w-full h-[5.6rem] bg-[#51a8ff] rounded-[4.6rem] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] flex items-center justify-center"
            data-name="Button"
          >
            <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] text-white">
              {showModifyButton ? '수정하기' : '요청 취소하기'}
            </p>
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-[rgba(9,18,28,0.4)] z-50 flex items-center justify-center" data-name="pop-up">
          <div className="flex flex-col gap-[2.4rem] items-center w-[31.2rem]">
            {/* Confirmation Message */}
            <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.8rem] leading-[2.8rem] tracking-[0.024rem] text-white text-center">
              수정 요청을 취소하시겠습니까?
            </p>

            {/* Buttons */}
            <div className="flex gap-[1.2rem] w-full">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 h-[5.2rem] bg-white rounded-[4.6rem] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] flex items-center justify-center"
                data-name="Button"
              >
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] text-[#09121c]">닫기</p>
              </button>
              <button
                onClick={handleCancelRequest}
                className="flex-1 h-[5.2rem] bg-[#51a8ff] rounded-[4.6rem] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] flex items-center justify-center"
                data-name="Button"
              >
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] text-[1.6rem] leading-[2.4rem] tracking-[0.024rem] text-white">취소</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
