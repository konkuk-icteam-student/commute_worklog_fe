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
      <div className="absolute bg-gradient-to-b from-[#f8fbff] h-full left-0 to-[#ffffff] top-0 w-full" data-name="Background" />

      {/* Header */}
      <div className="absolute bg-[#51a8ff] box-border content-stretch flex gap-[15.996px] h-[95.476px] items-center left-0 pl-[31.992px] pr-0 py-0 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-full" data-name="Container">
        {/* Back Button */}
        <button
          onClick={() => navigate('/schedule')}
          className="relative rounded-[1.81848e+07px] shrink-0 size-[39.986px]"
          data-name="Button"
        >
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[7.994px] px-[7.994px] relative size-[39.986px]">
            <div className="h-[23.998px] overflow-clip relative shrink-0 w-full" data-name="Icon">
              <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
                <div className="absolute inset-[-7.14%_-14.29%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 16">
                    <path d={svgPathsModify.p34178300} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99985" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
                <div className="absolute inset-[-1px_-7.14%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
                    <path d="M14.9989 0.999926H0.999926" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99985" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </button>

        <div className="h-[47.48px] relative shrink-0 w-[123.505px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[3.997px] h-[47.48px] items-start relative w-[123.505px]">
            <div className="h-[23.99px] relative shrink-0 w-full" data-name="Heading 1">
              <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[1.17px] whitespace-pre">근로 시간 수정</p>
            </div>
            <div className="h-[19.493px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[13px] text-[rgba(255,255,255,0.8)] text-nowrap top-[-0.46px] whitespace-pre">10월</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="absolute left-0 top-[95.476px] right-0 bottom-0 overflow-y-auto pb-[100px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] pt-[20px] w-full">
          {/* Info Alert */}
          <div className="bg-[rgba(81,168,255,0.05)] box-border content-stretch flex h-[36px] items-center pl-[12.541px] pr-[12px] py-[0.542px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
            <div aria-hidden="true" className="absolute border-[0.542px] border-[rgba(81,168,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="h-[36px] relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center relative size-full">
                <div className="content-stretch flex gap-[7.994px] items-center relative shrink-0" data-name="Container">
                  <div className="relative shrink-0 size-[13.998px]" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9976 13.9976">
                      <g clipPath="url(#clip0_71_217)" id="Icon">
                        <path d={svgPathsModify.p2ee58b00} id="Vector" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
                        <path d="M6.99878 4.66585V6.99878" id="Vector_2" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
                        <path d="M6.99878 9.3317H7.00461" id="Vector_3" stroke="#51A8FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16646" />
                      </g>
                      <defs>
                        <clipPath id="clip0_71_217">
                          <rect fill="white" height="13.9976" width="13.9976" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="h-[22px] opacity-70 relative shrink-0" data-name="Paragraph">
                    <p className="font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[18px] not-italic text-[#09121c] text-[12px] tracking-[0.18px] whitespace-pre">수정 요청 승인 대기 중 · 동시 최대 요청 1건</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
            <button
              onClick={() => setFilterTab('all')}
              className={`absolute h-[35.997px] left-0 rounded-[44px] shadow-[0px_4px_${filterTab === 'all' ? '20' : '25'}px_0px_rgba(${filterTab === 'all' ? '81,168,255' : '5,6,24'},${filterTab === 'all' ? '0.07' : '0.05'})] top-0 w-[59.75px] ${filterTab === 'all' ? 'bg-[#51a8ff]' : 'bg-white'}`}
              data-name="Button"
            >
              <div className="absolute h-[16px] left-[16px] top-[11px] w-[28px]" data-name="Paragraph">
                <p className={`absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[12px] left-[2px] not-italic text-[13px] text-nowrap top-px tracking-[0.21px] ${filterTab === 'all' ? 'text-white' : 'text-[#09121c]'}`}>전체</p>
              </div>
            </button>
            <button
              onClick={() => setFilterTab('pending')}
              className={`absolute h-[35.997px] left-[69.74px] rounded-[44px] shadow-[0px_4px_${filterTab === 'pending' ? '20' : '25'}px_0px_rgba(${filterTab === 'pending' ? '81,168,255' : '5,6,24'},${filterTab === 'pending' ? '0.07' : '0.05'})] top-0 w-[62.036px] ${filterTab === 'pending' ? 'bg-[#51a8ff]' : 'bg-white'}`}
              data-name="Button"
            >
              <div className="absolute h-[16px] left-[17.26px] top-[11px] w-[28px]" data-name="Paragraph">
                <p className={`absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[12px] left-[-4px] not-italic text-[13px] text-nowrap top-px tracking-[0.21px] ${filterTab === 'pending' ? 'text-white' : 'text-[#09121c]'}`}>대기중</p>
              </div>
            </button>
            <button
              onClick={() => setFilterTab('approved')}
              className={`absolute h-[35.997px] left-[142px] rounded-[44px] shadow-[0px_4px_${filterTab === 'approved' ? '20' : '25'}px_0px_rgba(${filterTab === 'approved' ? '81,168,255' : '5,6,24'},${filterTab === 'approved' ? '0.07' : '0.05'})] top-0 w-[62.036px] ${filterTab === 'approved' ? 'bg-[#51a8ff]' : 'bg-white'}`}
              data-name="Button"
            >
              <div className="absolute h-[16px] left-[17.26px] top-[11px] w-[28px]" data-name="Paragraph">
                <p className={`absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[12px] left-[-4px] not-italic text-[13px] text-nowrap top-px tracking-[0.21px] ${filterTab === 'approved' ? 'text-white' : 'text-[#09121c]'}`}>승인됨</p>
              </div>
            </button>
            <button
              onClick={() => setFilterTab('rejected')}
              className={`absolute h-[35.997px] left-[214px] rounded-[44px] shadow-[0px_4px_${filterTab === 'rejected' ? '20' : '25'}px_0px_rgba(${filterTab === 'rejected' ? '81,168,255' : '5,6,24'},${filterTab === 'rejected' ? '0.07' : '0.05'})] top-0 w-[62.036px] ${filterTab === 'rejected' ? 'bg-[#51a8ff]' : 'bg-white'}`}
              data-name="Button"
            >
              <div className="absolute h-[16px] left-[17.26px] top-[11px] w-[28px]" data-name="Paragraph">
                <p className={`absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[12px] left-[-4px] not-italic text-[13px] text-nowrap top-px tracking-[0.21px] ${filterTab === 'rejected' ? 'text-white' : 'text-[#09121c]'}`}>거부됨</p>
              </div>
            </button>
          </div>

          {/* Request Cards */}
          {filteredRequests.map((request, index) => {
            const colors = getStatusColors(request.status);
            return (
              <div key={index} className="bg-white h-[236px] relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] shrink-0 w-full">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex flex-col items-start p-[0.542px] relative size-full">
                    <div className="h-[235px] relative shrink-0 w-full" data-name="Container">
                      <div className="absolute h-[20px] left-[20.46px] top-[15.91px] w-[304px]" data-name="Container">
                        <div className="absolute content-stretch flex flex-col h-[56.481px] items-start left-0 top-0 w-[284.397px]" data-name="Container">
                          <div className="content-stretch flex h-[19.493px] items-center relative shrink-0 w-full" data-name="Container">
                            <div className="relative shrink-0 h-[19.493px] w-[77.177px]">
                              <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[19.5px] left-0 not-italic text-[#09121c] text-[13px] text-nowrap top-[-0.46px]">{request.id}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20.46px] top-[44.01px] w-[304.39px]">
                        {/* Status Badge */}
                        <div className={`${colors.bg} content-stretch flex flex-col gap-[3.997px] h-[52.561px] items-start pb-[0.542px] pt-[8.536px] px-[12.541px] relative rounded-[10px] shrink-0 w-[304.39px]`} data-name="Container">
                          <div aria-hidden="true" className={`absolute ${colors.border} border-[0.542px] border-solid inset-0 pointer-events-none rounded-[10px]`} />
                          <div className="h-[16.496px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className={`absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[16.5px] left-0 not-italic ${colors.titleColor} text-[11px] text-nowrap top-[-0.46px]`}>{request.statusLabel}</p>
                          </div>
                          <div className="h-[14.997px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className={`absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[15px] left-0 not-italic ${colors.descColor} text-[10px] text-nowrap top-[-0.46px]`}>{request.statusDescription}</p>
                          </div>
                        </div>

                        {/* Application Date */}
                        <div className="bg-[#f9fafb] h-[51.477px] relative rounded-[10px] shrink-0 w-full">
                          <div className="content-stretch flex flex-col gap-[3.997px] items-start pb-0 pt-[7.994px] px-[11.999px] relative size-full">
                            <div className="h-[14.997px] relative shrink-0 w-full">
                              <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[15px] left-0 not-italic text-[#09121c] text-[10px] text-nowrap top-[-0.46px]">신청일</p>
                            </div>
                            <div className="h-[16.496px] opacity-70 relative shrink-0 w-full">
                              <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#09121c] text-[11px] text-nowrap top-[-0.46px]">{request.applicationDate}</p>
                            </div>
                          </div>
                        </div>

                        {/* Modification Reason */}
                        <div className="bg-[#f9fafb] h-[51.477px] relative rounded-[10px] shrink-0 w-full">
                          <div className="content-stretch flex flex-col gap-[3.997px] items-start pb-0 pt-[7.994px] px-[11.999px] relative size-full">
                            <div className="h-[14.997px] relative shrink-0 w-full">
                              <p className="absolute font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[15px] left-0 not-italic text-[#09121c] text-[10px] text-nowrap top-[-0.46px]">수정 사유</p>
                            </div>
                            <div className="h-[16.496px] opacity-70 relative shrink-0 w-full">
                              <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#09121c] text-[11px] text-nowrap top-[-0.46px]">{request.modificationReason}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expand Arrow */}
                      <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className="absolute flex items-center justify-center left-[308.46px] size-[15.996px] top-[17.46px]">
                        <div className="flex-none rotate-[270deg]">
                          <div className="relative size-[15.996px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.996 15.996">
                              <g id="Icon">
                                <path d={svgPathsModify.p351ca610} id="Vector" stroke="#09121C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Action Button - Cancel or Modify based on most recent request status */}
          {showModifyButton ? (
            <button
              onClick={handleModifySchedule}
              className="bg-[#51a8ff] content-stretch flex flex-col h-[55.982px] items-start rounded-[46px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] w-full"
              data-name="Button"
            >
              <div className="flex items-center justify-center size-full">
                <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] left-1/2 -translate-x-1/2 not-italic text-[16px] text-nowrap text-white top-0 tracking-[0.24px]">수정하기</p>
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setShowCancelModal(true)}
              className="bg-[#51a8ff] content-stretch flex flex-col h-[55.982px] items-start rounded-[46px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] w-full"
              data-name="Button"
            >
              <div className="flex items-center justify-center size-full">
                <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['LINE_Seed_Sans_KR:Regular',sans-serif] leading-[24px] left-1/2 -translate-x-1/2 not-italic text-[16px] text-nowrap text-white top-0 tracking-[0.24px]">요청 취소하기</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="absolute backdrop-blur-[2px] backdrop-filter bg-[rgba(9,18,28,0.4)] h-full left-0 overflow-clip top-0 w-full z-50" data-name="pop-up">
          <div className="absolute content-stretch flex flex-col gap-[24px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[312px]">
            {/* Confirmation Message */}
            <div className="relative shrink-0 w-full text-center">
              <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[28px] not-italic text-white text-[18px] tracking-[0.24px]">수정 요청을 취소하시겠습니까?</p>
            </div>

            {/* Buttons */}
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-white content-stretch flex flex-col h-[52px] items-center justify-center relative rounded-[46px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] shrink-0 w-[150px]"
                data-name="Button"
              >
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#09121c] text-[16px] text-nowrap tracking-[0.24px]">닫기</p>
              </button>
              <button
                onClick={handleCancelRequest}
                className="bg-[#51a8ff] content-stretch flex flex-col h-[52px] items-center justify-center relative rounded-[46px] shadow-[0px_4px_20px_0px_rgba(81,168,255,0.07)] shrink-0 w-[150px]"
                data-name="Button"
              >
                <p className="font-['LINE_Seed_Sans_KR:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[0.24px]">취소</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
