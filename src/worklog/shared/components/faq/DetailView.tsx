import { useState, useEffect } from 'react';
import { getFaqDetail, type FaqDetailResponse } from '@/worklog/shared/apis/faq/faq.api';
import WriteForm from './WriteForm';

// 공통 라벨 스타일 (WriteForm과 동일)
const labelStyle =
  'flex h-[36px] w-[71px] shrink-0 items-center justify-center rounded-[6px] border border-[#E8EEF2] text-[16px] font-[700] text-[#17191A]';

const DetailView = ({ faqId, updatedDate }: { faqId?: number; updatedDate?: string }) => {
  const [data, setData] = useState<FaqDetailResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [errorMsg, setErrorMsg] = useState('');

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
        // 💡 핵심 2. targetDate 대신 상태값인 selectedDate를 파라미터로 전송!
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
  }, [faqId, selectedDate]); // selectedDate가 바뀔 때마다 API 재호출!

  if (errorMsg) {
    return (
      <div className="flex h-[300px] items-center justify-center text-[15px] font-bold text-red-500">
        {errorMsg}
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-gray-500">로딩 중...</div>;

  // 💡 수정 모드일 때 WriteForm 렌더링 (취소 콜백 전달)
  if (isEditing) {
    return <WriteForm initialData={data} onCancel={() => setIsEditing(false)} />;
  }
  // 💡 타임라인 데이터 구성 (삭제일 + 수정일 병합 및 내림차순 정렬)
  const historyList = [];
  if (data.deletedAt) historyList.push({ date: data.deletedAt, type: 'deleted' });
  data.editedDates?.forEach((d) => historyList.push({ date: d, type: 'edited' }));
  historyList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let activeDate = selectedDate;
  if (!historyList.some((h) => h.date === selectedDate) && historyList.length > 0) {
    activeDate = historyList[0].date;
  }

  return (
    <div className="flex flex-col gap-6 pb-20 pt-4">
      {/* 1. 제목 & 삭제 뱃지 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-bold text-[#17191A]">{data.title}</h1>
          {data.deletedFlag && (
            <span className="rounded bg-[#EEF2FF] px-2 py-1 text-[13px] font-bold text-[#4F46E5]">
              삭제됨
            </span>
          )}
        </div>
      </div>

      <hr className="border-[#E8EEF2]" />

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
            // 핵심 4. activeDate와 비교하여 현재 보고 있는 날짜 표시
            const isActive = item.date === activeDate;

            return (
              <div key={idx} className="relative flex items-center pl-4 text-[15px]">
                <div className="absolute -left-[5px] h-[8px] w-[8px] rounded-full bg-[#8C9499]" />

                {item.type === 'deleted' ? (
                  <span className="text-[16px] text-[#8C9499]">{item.date} (삭제)</span>
                ) : isActive ? (
                  // 현재 보고 있는 날짜 (클릭 X, 파란색 유지)
                  <span className="text-[16px] font-bold text-blue-600 underline underline-offset-4">
                    {item.date}
                  </span>
                ) : (
                  // 핵심 5. 클릭 시 setSelectedDate를 호출하여 API 재요청 트리거!
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
          {/* 현재 담당자 */}
          <div className="flex flex-wrap gap-2 pt-1">
            {data.currentManagers?.map((mgr, i) => (
              <span key={i} className="text-[14px] text-[#17191A]">
                {mgr.managerName}({mgr.organizationName}, {mgr.categoryName})
              </span>
            ))}
          </div>
          {/* 과거 담당자 */}
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

      {/* 첨부파일 확인 */}
      {data.files?.length > 0 && (
        <div className="flex w-fit items-center gap-2 rounded-[6px] border p-2 text-[#464A4D]">
          <span>📎</span>
          <span className="text-[14px]">첨부파일 {data.files.length}건</span>
        </div>
      )}

      {/* 수정하기 버튼 */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-[6px] border border-[#E8EEF2] px-6 py-2.5 text-[14px] font-bold text-[#464A4D] transition-colors hover:bg-gray-50"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default DetailView;
