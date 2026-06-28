import { useState, useRef, useEffect } from 'react';
import type { ClipboardEvent, ChangeEvent } from 'react';
import xIcon from './x.svg';

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

const WriteForm = () => {
  // 전체 폼 상태 관리 (API 명세서 형식 일치)
  const [formData, setFormData] = useState({
    title: '',
    complainantName: '',
    categoryIds: '', // 배열 변환용 임시 string (ex: "1, 2, 3")
    relatedFaqIds: '', // 배열 변환용 임시 string
    content: '', // HTML 저장
    answer: '', // HTML 저장
    etc: '',
    files: [] as File[], // UI 표시 및 업로드용
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 일반 입력 핸들러
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 첨부파일 선택 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...selectedFiles] }));
    }
  };

  // 파일 삭제
  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  // 작성완료 버튼 클릭 -> 모달 오픈
  const handleSubmitClick = () => {
    // 2단계에서 유효성 검사 추가 예정
    setIsModalOpen(true);
  };

  // 모달 안에서 최종 '확인' 클릭 시 -> 실제 API 전송 로직
  const handleConfirmSubmit = async () => {
    console.log('🚀 [API 호출 준비 완료] 전송될 데이터:', {
      ...formData,
      categoryIds: formData.categoryIds
        .split(',')
        .map((id) => Number(id.trim()))
        .filter(Boolean),
      relatedFaqIds: formData.relatedFaqIds
        .split(',')
        .map((id) => Number(id.trim()))
        .filter(Boolean),
    });

    // [2단계 연동 시 여기에 파일 선업로드 및 createFaq 호출 로직 추가]
    setIsModalOpen(false);
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

      {/* 3. 분류 ID (다중) */}
      <div className="flex gap-4">
        <div className={labelStyle}>분류 ID</div>
        <InputField
          value={formData.categoryIds}
          onChange={(val) => handleFieldChange('categoryIds', val)}
          placeholder="예: 1, 2, 3 (쉼표로 구분)"
        />
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

      {/* 6. 연관 FAQ ID (다중) */}
      <div className="flex gap-4">
        <div className={labelStyle}>관련 FAQ</div>
        <InputField
          value={formData.relatedFaqIds}
          onChange={(val) => handleFieldChange('relatedFaqIds', val)}
          placeholder="관련된 FAQ ID를 입력하세요 (예: 10, 15)"
        />
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

        {/* 선택된 파일 리스트 UI */}
        {formData.files.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded bg-gray-100 px-3 py-1.5 text-[13px] text-gray-700"
              >
                <span className="max-w-[200px] truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(idx)}
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
          onClick={handleSubmitClick}
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
                className="flex-1 rounded-[8px] bg-gray-100 py-2.5 text-[14px] font-bold text-[#464A4D] hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 rounded-[8px] bg-[#3B82F6] py-2.5 text-[14px] font-bold text-white hover:bg-blue-600"
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

export default WriteForm;
