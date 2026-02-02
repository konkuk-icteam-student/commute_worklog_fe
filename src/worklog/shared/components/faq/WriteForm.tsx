import { useState } from 'react';
import xIcon from './x.svg'; // x.svg 경로에 맞춰주세요 (없으면 assets 폴더 등 확인)

// 공통 라벨 스타일
const labelStyle =
  'flex h-[36px] w-[71px] shrink-0 items-center justify-center rounded-[6px] border border-[#E8EEF2] text-[16px] font-[700] text-[#17191A]';

// 재사용 가능한 Input 컴포넌트 (X 버튼 기능 포함)
const InputField = ({ placeholder }: { placeholder?: string }) => {
  const [value, setValue] = useState('');

  return (
    <div className="relative flex h-[36px] flex-1 items-center rounded-[6px] border border-[#E8EEF2] bg-[#E8EEF2] px-3">
      <input
        type="text"
        className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-[#8C9499]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-2 flex items-center justify-center"
        >
          <img src={xIcon} alt="삭제" />
        </button>
      )}
    </div>
  );
};

const WriteForm = () => {
  return (
    <div className="flex flex-col gap-4 pb-20">
      {' '}
      {/* 하단 버튼 공간 확보를 위해 pb-20 */}
      {/* 1. 제목 */}
      <div className="flex gap-4">
        <div className={labelStyle}>제목</div>
        <InputField />
      </div>
      {/* 2. 민원인 */}
      <div className="flex gap-4">
        <div className={labelStyle}>민원인</div>
        <InputField />
      </div>
      {/* 3. 내용 (높이 유동적일 수 있으나 일단 InputField 사용, 필요시 textarea로 변경) */}
      <div className="flex gap-4">
        <div className={labelStyle}>내용</div>
        <div className="relative flex min-h-[100px] flex-1 rounded-[6px] border border-[#E8EEF2] bg-[#E8EEF2] p-3">
          <textarea
            className="h-full w-full resize-none bg-transparent text-[14px] outline-none placeholder:text-[#8C9499]"
            placeholder="내용을 입력하세요"
          />
        </div>
      </div>
      {/* 4. 분류 */}
      <div className="flex gap-4">
        <div className={labelStyle}>분류</div>
        <InputField />
      </div>
      {/* 5. 이미지 (목업) */}
      <div className="flex gap-4">
        <div className={labelStyle}>이미지</div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-[71px] w-[71px] items-center justify-center rounded-[6px] bg-[#F4F6F8] text-[#8C9499]"
            >
              +
            </div>
          ))}
        </div>
      </div>
      {/* 6. 답변 */}
      <div className="flex gap-4">
        <div className={labelStyle}>답변</div>
        <div className="relative flex min-h-[200px] flex-1 rounded-[6px] border border-[#E8EEF2] bg-[#E8EEF2] p-3">
          <textarea
            className="h-full w-full resize-none bg-transparent text-[14px] outline-none placeholder:text-[#8C9499]"
            placeholder="내용을 입력하세요"
          />
        </div>
      </div>
      {/* 7. 비고 */}
      <div className="flex gap-4">
        <div className={labelStyle}>비고</div>
        <InputField />
      </div>
      {/* 첨부파일 올리기 버튼 */}
      <button className="flex items-center gap-2 text-[#464A4D] hover:underline">
        <span>📎</span>
        <span className="text-[14px]">첨부파일 올리기</span>
      </button>
      {/* 하단 고정 버튼 영역 (임시저장 / 작성완료) */}
      <div className="mt-8 flex justify-end gap-2">
        <button
          onClick={() => console.log('임시저장 버튼 클릭!')}
          className="rounded-[6px] border border-[#E8EEF2] px-4 py-2 text-[14px] font-bold text-[#464A4D] hover:bg-gray-50"
        >
          임시 저장
        </button>
        <button
          onClick={() => console.log('작성완료 버튼 클릭!')}
          className="rounded-[6px] bg-[#E8EEF2] px-4 py-2 text-[14px] font-bold text-[#17191A] hover:bg-gray-200"
        >
          작성완료
        </button>
      </div>
    </div>
  );
};

export default WriteForm;
