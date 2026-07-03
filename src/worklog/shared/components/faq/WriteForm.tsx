import { useState, useRef, useEffect } from 'react';
import type { ClipboardEvent, ChangeEvent, DragEvent } from 'react';
import xIcon from './x.svg';

// API Imports (경로는 실제 구조에 맞게 확인해주세요)
import { getCategories, type Category } from '@/worklog/shared/apis/categories/categories.api';
import { recommendCategory } from '@/worklog/shared/apis/faq/faqai.api';
import { createFaq, uploadFaqFile, type FaqRequest } from '@/worklog/shared/apis/faq/faq.api';

const labelStyle =
  'flex h-[36px] w-[80px] shrink-0 items-center justify-center rounded-[6px] border border-[#E8EEF2] text-[15px] font-[700] text-[#17191A]';

// 일반 텍스트 Input 컴포넌트
const InputField = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className="relative flex h-[36px] flex-1 items-center rounded-[6px] border border-[#E8EEF2] bg-[#F4F6F8] px-3 transition-colors focus-within:border-blue-400 focus-within:bg-white">
      <input
        type="text"
        className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-[#8C9499]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 flex items-center justify-center opacity-50 hover:opacity-100"
        >
          <img src={xIcon} alt="삭제" className="h-[14px] w-[14px]" />
        </button>
      )}
    </div>
  );
};

// 💡 노션 스타일 이미지 복붙 지원 Rich Text Editor (한글 IME 이슈 해결 버전)
const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  minHeight = '120px',
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // ✅ 핵심 해결책: 외부 상태(value)와 에디터 내부 HTML이 다를 때만 동기화
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // 텍스트 입력 시 HTML 추출하여 부모로 전달
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // 클립보드 붙여넣기 감지 이벤트 (이미지 가로채기)
  const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault(); // 기본 붙여넣기(텍스트 등) 방지
        const file = items[i].getAsFile();
        if (!file) continue;

        // [2단계 연동 시] 여기서 await uploadFaqImage(file) 호출 후 실제 URL 받아옴
        // 현재는 UI 확인을 위해 브라우저 임시 URL 생성 (mock)
        const mockUrl = URL.createObjectURL(file);

        // 에디터 커서 위치에 이미지 태그 삽입
        const imgTag = `<br/><img src="${mockUrl}" alt="pasted-image" style="max-width: 100%; border-radius: 8px; margin: 8px 0;" /><br/>`;
        document.execCommand('insertHTML', false, imgTag);

        // 상태 업데이트 반영
        handleInput();
      }
    }
  };

  return (
    <div
      className={`relative flex flex-1 flex-col rounded-[6px] border border-[#E8EEF2] bg-[#F4F6F8] p-3 transition-colors focus-within:border-blue-400 focus-within:bg-white`}
      style={{ minHeight }}
    >
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className="h-full w-full flex-1 text-[14px] outline-none"
        data-placeholder={placeholder}
      />
      {/* CSS로 placeholder 구현 */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #8C9499;
          cursor: text;
        }
      `}</style>
    </div>
  );
};

// AI 아이콘 (파란색 스파클 SVG)
const SparkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z"
      fill="#3B82F6"
    />
  </svg>
);

const WriteForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    complainantName: '',
    content: '',
    answer: '',
    etc: '',
    files: [] as File[],
  });

  // 1. 분류 (카테고리) 관련 상태
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 2. 관련 FAQ (드래그 앤 드롭) 관련 상태
  const [relatedFaqs, setRelatedFaqs] = useState<{ id: number; title: string }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // 3. AI 추천 관련 상태
  const [aiCategories, setAiCategories] = useState<{ id: number; name: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 전송 중 로딩 상태

  // 마운트 시 분류 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.isSuccess) setAvailableCategories(res.details.categories);
      } catch (err) {
        console.error('분류 목록 조회 실패:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...Array.from(e.target.files!)] }));
    }
  };

  // 💡 분류 드롭다운 처리
  const toggleCategory = (category: Category) => {
    setSelectedCategories(
      (prev) =>
        prev.some((c) => c.categoryId === category.categoryId)
          ? prev.filter((c) => c.categoryId !== category.categoryId) // 있으면 제거
          : [...prev, category] // 없으면 추가
    );
  };

  // 💡 드래그 앤 드롭 (관련 FAQ) 처리 함수
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data && data.id && data.title) {
        // 이미 추가된 게시글이 아니면 추가
        if (!relatedFaqs.some((faq) => faq.id === data.id)) {
          setRelatedFaqs((prev) => [...prev, data]);
        }
      }
    } catch (err) {
      console.error('드롭 데이터 파싱 오류:', err);
    }
  };

  // 💡 AI 카테고리 추천 요청 함수
  const handleAiRecommend = async () => {
    if (!formData.title || !formData.content) {
      alert('제목과 내용을 먼저 작성해주세요!');
      return;
    }
    setIsAiLoading(true);
    try {
      // HTML 태그 제거 후 순수 텍스트만 AI에게 전송
      const plainContent = formData.content.replace(/<[^>]+>/g, '');
      const res = await recommendCategory({ title: formData.title, content: plainContent });

      setAiCategories(res.categories);

      // AI가 추천한 결과를 실제 선택된 카테고리에도 자동 추가 (이름 기준 매칭)
      const newSelections = res.categories
        .map((ai) => availableCategories.find((c) => c.categoryId === ai.id))
        .filter((c): c is Category => c !== undefined);

      setSelectedCategories((prev) => {
        const combined = [...prev, ...newSelections];
        // 중복 제거
        return Array.from(new Map(combined.map((item) => [item.categoryId, item])).values());
      });
    } catch (err) {
      console.error('AI 추천 실패:', err);
      alert('AI 추천 중 오류가 발생했습니다.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // 💡 최종 제출 (모달 확인 클릭 시)
  const handleConfirmSubmit = async () => {
    if (!formData.title || !formData.answer) {
      alert('제목과 답변은 필수입니다.');
      setIsModalOpen(false);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. 파일이 있다면 먼저 업로드하여 URL 획득
      const uploadedFileUrls: string[] = [];
      for (const file of formData.files) {
        const fileRes = await uploadFaqFile(file);
        if (fileRes.isSuccess && fileRes.details.url) {
          uploadedFileUrls.push(fileRes.details.url);
        }
      }

      // 2. 최종 FAQ 생성 Payload 구성 (UI 데이터를 API 명세에 맞게 변환!)
      const payload: FaqRequest = {
        title: formData.title,
        complainantName: formData.complainantName,
        categoryIds: selectedCategories.map((c) => c.categoryId), // 객체 배열 -> ID 숫자 배열
        content: formData.content,
        answer: formData.answer,
        etc: formData.etc,
        fileUrls: uploadedFileUrls,
        relatedFaqIds: relatedFaqs.map((f) => f.id), // 객체 배열 -> ID 숫자 배열
      };

      // 3. API 호출
      await createFaq(payload);

      alert('FAQ가 성공적으로 작성되었습니다!');
      setIsModalOpen(false);
      // TODO: 성공 후 탭 닫기나 초기화 로직 (부모 컴포넌트 호출)
    } catch (err) {
      console.error('FAQ 등록 실패:', err);
      alert('작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-5 pb-20 pt-4">
      {/* 1. 제목 */}
      <div className="flex gap-4">
        <div className={labelStyle}>제목</div>
        <InputField
          value={formData.title}
          onChange={(val) => handleFieldChange('title', val)}
          placeholder="FAQ 제목을 입력하세요"
        />
      </div>

      {/* 2. 민원인 */}
      <div className="flex gap-4">
        <div className={labelStyle}>민원인</div>
        <InputField
          value={formData.complainantName}
          onChange={(val) => handleFieldChange('complainantName', val)}
          placeholder="민원인 이름을 입력하세요"
        />
      </div>

      {/* 3. 분류 (다중 선택 드롭다운 UI) */}
      <div className="flex gap-4">
        <div className={labelStyle}>분류</div>
        <div className="relative flex-1">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex min-h-[36px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-[6px] border border-[#E8EEF2] bg-[#F4F6F8] px-3 py-1.5 transition-colors hover:border-blue-400"
          >
            {selectedCategories.length === 0 && (
              <span className="text-[14px] text-[#8C9499]">
                클릭하여 분류를 선택하세요 (다중 선택 가능)
              </span>
            )}
            {selectedCategories.map((cat) => (
              <span
                key={cat.categoryId}
                className="flex items-center gap-1 rounded border bg-white px-2 py-0.5 text-[13px] shadow-sm"
              >
                {cat.categoryName}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(cat);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          {/* 드롭다운 리스트 */}
          {isDropdownOpen && (
            <div className="absolute top-[40px] z-20 max-h-[200px] w-full overflow-y-auto rounded border bg-white shadow-lg">
              {availableCategories.map((cat) => (
                <div
                  key={cat.categoryId}
                  onClick={() => toggleCategory(cat)}
                  className={`cursor-pointer px-4 py-2 text-[14px] hover:bg-gray-100 ${selectedCategories.some((c) => c.categoryId === cat.categoryId) ? 'bg-blue-50 font-bold text-blue-600' : ''}`}
                >
                  {cat.categoryName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. 내용 (에디터) */}
      <div className="flex gap-4">
        <div className={labelStyle}>내용</div>
        <RichTextEditor
          value={formData.content}
          onChange={(val) => handleFieldChange('content', val)}
          placeholder="질문 내용을 입력하세요. (이미지 복사+붙여넣기 가능)"
          minHeight="150px"
        />
      </div>

      {/* ✨ 4.5. AI 카테고리 추천 영역 (내용과 답변 사이) */}
      <div className="flex gap-4">
        <div className="w-[80px] shrink-0" /> {/* 간격 맞추기용 빈 공간 */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <button
            onClick={handleAiRecommend}
            disabled={isAiLoading}
            className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600 transition-colors hover:bg-blue-100 disabled:opacity-50"
          >
            <SparkIcon />
            {isAiLoading ? 'AI 분석 중...' : 'AI 카테고리 추천받기'}
          </button>

          {/* AI 추천 결과 마커 표시 영역 */}
          {aiCategories.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              <SparkIcon />
              {aiCategories.map((cat) => (
                <span
                  key={cat.id}
                  className="rounded-[8px] border border-blue-100 bg-white px-3 py-1 text-[13px] font-medium text-gray-700 shadow-sm"
                >
                  {cat.name}
                </span>
              ))}
              <span className="ml-2 text-[12px] text-gray-400">분류에 자동 추가되었습니다.</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. 답변 (에디터) */}
      <div className="flex gap-4">
        <div className={labelStyle}>답변</div>
        <RichTextEditor
          value={formData.answer}
          onChange={(val) => handleFieldChange('answer', val)}
          placeholder="답변을 작성하세요. (이미지 복사+붙여넣기 가능)"
          minHeight="250px"
        />
      </div>

      {/* 6. 연관 FAQ (💡 드래그 앤 드롭 존) */}
      <div className="flex gap-4">
        <div className={labelStyle}>관련 FAQ</div>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`flex min-h-[44px] flex-1 flex-wrap items-center gap-2 rounded-[6px] border-2 border-dashed px-3 py-2 transition-colors ${
            isDragOver ? 'border-blue-400 bg-blue-50' : 'border-[#E8EEF2] bg-[#F4F6F8]'
          }`}
        >
          {relatedFaqs.length === 0 && (
            <span className="pointer-events-none text-[14px] text-[#8C9499]">
              우측 목록에서 관련된 FAQ를 이쪽으로 드래그 앤 드롭 해주세요.
            </span>
          )}
          {relatedFaqs.map((faq) => (
            <span
              key={faq.id}
              className="flex max-w-[250px] items-center gap-1.5 rounded border bg-white px-3 py-1 text-[13px] shadow-sm"
            >
              <span className="truncate font-medium text-blue-600">#{faq.id}</span>
              <span className="truncate">{faq.title}</span>
              <button
                onClick={() => setRelatedFaqs((prev) => prev.filter((f) => f.id !== faq.id))}
                className="ml-1 text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 7. 비고 */}
      <div className="flex gap-4">
        <div className={labelStyle}>비고</div>
        <InputField
          value={formData.etc}
          onChange={(val) => handleFieldChange('etc', val)}
          placeholder="추가 참고사항을 입력하세요"
        />
      </div>

      {/* 8. 첨부파일 */}
      <div className="flex flex-col gap-2 pt-2">
        <label className="flex w-fit cursor-pointer items-center gap-2 text-[#464A4D] hover:underline">
          <span>📎</span>
          <span className="text-[14px] font-medium">첨부파일 올리기</span>
          <input type="file" multiple className="hidden" onChange={handleFileChange} />
        </label>
        {formData.files.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded bg-gray-100 px-3 py-1.5 text-[13px] text-gray-700"
              >
                <span className="max-w-[200px] truncate">{file.name}</span>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      files: prev.files.filter((_, i) => i !== idx),
                    }))
                  }
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={() => console.log('임시저장 기능 개발 중')}
          className="rounded-[6px] border border-[#E8EEF2] px-6 py-2.5 text-[14px] font-bold text-[#464A4D] hover:bg-gray-50"
        >
          임시 저장
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-[6px] bg-[#3B82F6] px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-blue-600"
        >
          작성완료
        </button>
      </div>

      {/* 작성 완료 확인 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="flex w-[320px] flex-col items-center gap-6 rounded-[16px] bg-white p-6 shadow-xl">
            <h3 className="text-[18px] font-bold text-[#17191A]">작성 완료하시겠습니까?</h3>
            <p className="text-center text-[14px] text-[#8C9499]">
              작성하신 내용은 FAQ 목록에 즉시 반영됩니다.
            </p>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 rounded-[8px] bg-gray-100 py-2.5 text-[14px] font-bold text-[#464A4D] hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center rounded-[8px] bg-[#3B82F6] py-2.5 text-[14px] font-bold text-white hover:bg-blue-600"
              >
                {isSubmitting ? '처리 중...' : '확인'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteForm;
