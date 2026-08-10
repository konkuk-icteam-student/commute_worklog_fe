import { useState, useEffect } from 'react';
import { getFaqDetail, deleteFaq, type FaqDetailResponse } from '@/worklog/shared/apis/faq/faq.api';
import WriteForm from './WriteForm';

// 공통 라벨 스타일 (WriteForm과 동일)
const labelStyle =
  'flex h-[36px] w-[71px] shrink-0 items-center justify-center rounded-[6px] border border-[#E8EEF2] text-[16px] font-[700] text-[#17191A]';

const DetailView = ({
  faqId,
  updatedDate,
  onSuccess,
  onRelatedClick,
  isDraft = false,
  isModalMode = false,
  showDeleteBtn = false,
}: {
  faqId?: number;
  updatedDate?: string;
  onSuccess?: () => void;
  onRelatedClick?: (faqId: number) => void;
  isDraft?: boolean;
  isModalMode?: boolean;
  showDeleteBtn?: boolean;
}) => {
  const [data, setData] = useState<FaqDetailResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 삭제 관련 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false); // 💡 [추가] 삭제 완료 모달 상태
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [selectedDate, setSelectedDate] = useState<string>(
    updatedDate || new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    setSelectedDate(updatedDate || new Date().toISOString().split('T')[0]);
  }, [faqId, updatedDate]);

  useEffect(() => {
    if (!faqId) return;
    const fetchDetail = async () => {
      try {
        const res = await getFaqDetail(faqId, selectedDate);
        setData(res);
        setErrorMsg('');
      } catch (err) {
        console.error('FAQ 상세 조회 실패:', err);
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg('데이터를 불러올 수 없습니다.');
        }
      }
    };
    fetchDetail();
  }, [faqId, selectedDate, refreshTrigger]);

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!faqId) return;
    setIsDeleting(true);
    try {
      await deleteFaq(faqId);
      setIsDeleteModalOpen(false); // 1. 확인 모달 닫기
      setIsDeleteSuccessModalOpen(true); // 💡 2. 알림창 대신 완료 커스텀 모달 띄우기
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (errorMsg) {
    return (
      <div className="flex h-[300px] items-center justify-center text-[15px] font-bold text-red-500">
        {errorMsg}
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-gray-500">로딩 중...</div>;

  if (isEditing) {
    return (
      <WriteForm
        initialData={data}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => {
          setIsEditing(false);
          setRefreshTrigger((prev) => prev + 1);
        }}
      />
    );
  }

  const historyList = [];
  if (data.deletedAt) historyList.push({ date: data.deletedAt, type: 'deleted' });
  data.editedDates?.forEach((d) => historyList.push({ date: d, type: 'edited' }));
  historyList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let activeDate = selectedDate;
  if (!historyList.some((h) => h.date === selectedDate) && historyList.length > 0) {
    activeDate = historyList[0].date;
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* 1. 상단 타이틀 & 태그 영역 */}
      {isModalMode ? (
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#8C9499]">
            <span>🏠 FAQ</span>
            <span>&gt;</span>
            <span>{data.categoryNames?.[0] || '분류 없음'}</span>
          </div>
          <div className="mt-1 flex items-center gap-4">
            <h1 className="text-[32px] font-bold text-[#17191A]">{data.title}</h1>
            {data.deletedFlag && (
              <span className="flex h-[32px] items-center justify-center rounded-[8px] bg-[#EEF2FF] px-4 text-[15px] font-bold text-[#4F46E5]">
                삭제됨
              </span>
            )}
            {isDraft && (
              <span className="flex h-[32px] items-center justify-center rounded-[8px] bg-[#FFF9E6] px-4 text-[15px] font-bold text-[#F59E0B]">
                임시저장
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {data.deletedFlag && (
              <span className="rounded bg-[#EEF2FF] px-2 py-1 text-[13px] font-bold text-[#4F46E5]">
                삭제됨
              </span>
            )}
            {isDraft && (
              <span className="rounded bg-[#FFF9E6] px-2 py-1 text-[13px] font-bold text-[#F59E0B]">
                임시저장
              </span>
            )}
          </div>
        </div>
      )}

      {/* 구분선 */}
      {!isModalMode && <hr className="border-[#E8EEF2]" />}

      {/* 2. 민원인 */}
      <div className="flex gap-4">
        <div className={labelStyle}>민원인</div>
        <div className="flex h-[36px] flex-1 items-center px-2 text-[14px]">
          {data.complainantName}
        </div>
      </div>

      {/* 3. 작성자 */}
      <div className="flex gap-4">
        <div className={labelStyle}>작성자</div>
        <div className="flex h-[36px] flex-1 items-center px-2 text-[14px]">{data.writerName}</div>
      </div>

      {/* 3.5. 분류 */}
      <div className="flex gap-4">
        <div className={labelStyle}>분류</div>
        <div className="flex min-h-[36px] flex-1 flex-wrap items-center gap-2 px-2">
          {data.categoryNames && data.categoryNames.length > 0 ? (
            data.categoryNames.map((category, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 rounded border border-[#E8EEF2] bg-[#F4F6F8] px-2 py-0.5 text-[13px] font-medium text-[#464A4D] shadow-sm"
              >
                {category}
              </span>
            ))
          ) : (
            <span className="text-[14px] text-[#8C9499]">지정된 분류가 없습니다.</span>
          )}
        </div>
      </div>

      {/* 4. 내용 (HTML 렌더링) */}
      <div className="flex gap-4">
        <div className={labelStyle}>내용</div>
        <div
          className="flex min-h-[100px] flex-1 flex-col rounded-[6px] bg-[#F4F6F8] p-4 text-[14px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>

      {/* 5. 답변 (HTML 렌더링) */}
      <div className="flex gap-4">
        <div className={labelStyle}>답변</div>
        <div
          className="flex min-h-[150px] flex-1 flex-col rounded-[6px] bg-[#F4F6F8] p-4 text-[14px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.answer }}
        />
      </div>

      {/* 5.5. 관련 FAQ */}
      <div className="flex gap-4">
        <div className={labelStyle}>관련 FAQ</div>
        <div className="flex min-h-[36px] flex-1 flex-wrap items-center gap-2 px-2">
          {data.relatedFaqs && data.relatedFaqs.length > 0 ? (
            data.relatedFaqs.map((faq) => (
              <button
                key={faq.faqId}
                onClick={() => onRelatedClick && onRelatedClick(faq.faqId)}
                title={faq.title}
                className="flex max-w-[250px] cursor-pointer items-center gap-1.5 rounded border border-[#E8EEF2] bg-white px-3 py-1.5 text-[13px] shadow-sm transition-colors hover:border-blue-400 hover:bg-blue-50"
              >
                <span className="shrink-0 font-bold text-blue-600">#{faq.faqId}</span>
                <span className="truncate font-medium text-[#464A4D]">{faq.title}</span>
              </button>
            ))
          ) : (
            <span className="text-[14px] text-[#8C9499]">등록된 관련 FAQ가 없습니다.</span>
          )}
        </div>
      </div>

      {/* 6. 비고 */}
      {data.etc && (
        <div className="flex gap-4">
          <div className={labelStyle}>비고</div>
          <div className="flex flex-1 items-center px-2 text-[14px]">{data.etc}</div>
        </div>
      )}

      {/* 7. 수정 이력 (타임라인 UI) */}
      <div className="flex gap-4">
        <div className={labelStyle}>수정</div>
        <div className="relative ml-2 flex flex-col gap-5 border-l-2 border-[#E8EEF2] py-2">
          {historyList.map((item, idx) => {
            const isActive = item.date === activeDate;

            return (
              <div key={idx} className="relative flex items-center pl-4 text-[15px]">
                <div className="absolute -left-[5px] h-[8px] w-[8px] rounded-full bg-[#8C9499]" />

                {item.type === 'deleted' ? (
                  <span className="text-[16px] text-[#8C9499]">{item.date} (삭제)</span>
                ) : isActive ? (
                  <span className="text-[16px] font-bold text-blue-600 underline underline-offset-4">
                    {item.date}
                  </span>
                ) : (
                  <span
                    onClick={() => setSelectedDate(item.date)}
                    className="cursor-pointer text-[16px] font-bold text-[#464A4D] underline underline-offset-4 hover:text-blue-500"
                  >
                    {item.date}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. 담당자 */}
      <div className="flex gap-4">
        <div className={labelStyle}>담당자</div>
        <div className="flex flex-1 flex-col justify-center px-2">
          <div className="flex flex-wrap gap-2 pt-1">
            {data.currentManagers?.map((mgr, i) => (
              <span key={i} className="text-[14px] text-[#17191A]">
                {mgr.managerName}({mgr.organizationName}, {mgr.categoryName})
              </span>
            ))}
          </div>
          {data.pastManagers?.length > 0 && (
            <div className="mt-2 text-[12px] text-[#8C9499]">
              *작성 당시 담당자와 현재 담당자가 다릅니다. 현재 담당자는 아래와 같습니다.
              <br />
              <div className="mt-1 flex flex-wrap gap-2">
                {data.pastManagers.map((mgr, i) => (
                  <span key={i} className="rounded border bg-white px-2 py-1 shadow-sm">
                    {mgr.managerName}({mgr.organizationName})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 9. 첨부파일 */}
      {data.files && data.files.length > 0 && (
        <div className="flex gap-4">
          <div className={labelStyle}>첨부파일</div>
          <div className="flex flex-1 flex-col justify-center gap-1.5 px-2 py-1">
            {data.files.map((file, idx) => (
              <a
                key={idx}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 text-[14px] text-[#464A4D] transition-colors hover:text-blue-600 hover:underline"
              >
                <span>📎</span>
                <span>{file.originalName || `첨부파일 ${idx + 1}`}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 10. 수정/삭제 버튼 영역 */}
      {!data.deletedFlag && (
        <div className="mt-8 flex justify-end gap-3">
          {showDeleteBtn && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="rounded-[6px] border border-red-200 bg-white px-6 py-2.5 text-[14px] font-bold text-red-500 transition-colors hover:bg-red-50"
            >
              삭제하기
            </button>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-[6px] border border-[#E8EEF2] bg-white px-6 py-2.5 text-[14px] font-bold text-[#464A4D] transition-colors hover:bg-gray-50"
          >
            수정하기
          </button>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="flex w-[320px] flex-col items-center gap-6 rounded-[16px] bg-white p-6 shadow-xl">
            <h3 className="text-[18px] font-bold text-[#17191A]">업무일지를 삭제하시겠습니까?</h3>
            <p className="text-center text-[14px] text-[#8C9499]">
              삭제된 업무일지는 목록에서 '삭제됨' 상태로 표시됩니다.
            </p>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 rounded-[8px] bg-gray-100 py-2.5 text-[14px] font-bold text-[#464A4D] hover:bg-gray-200"
              >
                아니오
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center rounded-[8px] bg-red-500 py-2.5 text-[14px] font-bold text-white hover:bg-red-600"
              >
                {isDeleting ? '삭제 중...' : '예'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💡 [추가] 삭제 성공 완료 모달 */}
      {isDeleteSuccessModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="flex w-[320px] flex-col items-center gap-6 rounded-[16px] bg-white p-6 shadow-xl">
            <h3 className="text-[18px] font-bold text-[#17191A]">삭제 완료</h3>
            <p className="text-center text-[14px] text-[#8C9499]">
              업무일지가 성공적으로 삭제되었습니다.
            </p>
            <div className="flex w-full">
              <button
                onClick={() => {
                  setIsDeleteSuccessModalOpen(false);
                  if (onSuccess) onSuccess(); // 확인을 누를 때 목록 화면으로 복귀!
                }}
                className="flex w-full items-center justify-center rounded-[8px] bg-[#3B82F6] py-2.5 text-[14px] font-bold text-white hover:bg-blue-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
