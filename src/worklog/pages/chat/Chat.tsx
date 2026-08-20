import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/worklog/shared/components/layout/MainLayout';
import { askChatbot } from '@/worklog/shared/apis/chat/chat.api';

// 메시지 타입 정의
type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  isLoading?: boolean;
  isConflict?: boolean;
};

// 제공해주신 AI 로고 SVG 컴포넌트화
const AiLogo = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    width="88"
    height="88"
    viewBox="0 0 88 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1893_1269)">
      <rect
        x="14"
        y="10"
        width="60"
        height="60"
        rx="30"
        fill="#17191A"
        shapeRendering="crispEdges"
      />
      <path
        d="M43.9993 34.1663V28.333H38.166"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.7487 34.166H35.2487C33.6379 34.166 32.332 35.4719 32.332 37.0827V48.7493C32.332 50.3602 33.6379 51.666 35.2487 51.666H52.7487C54.3595 51.666 55.6654 50.3602 55.6654 48.7493V37.0827C55.6654 35.4719 54.3595 34.166 52.7487 34.166Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.416 42.9163H32.3327M55.666 42.9163H58.5827M48.3743 41.458V44.3747M39.6243 41.458V44.3747"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1893_1269"
        x="0"
        y="0"
        width="88"
        height="88"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="7" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1893_1269" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1893_1269"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 세션 스토리지에서 대화 내역 불러오기
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('worklog_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // 대화 내역이 바뀔 때마다 세션 스토리지에 저장 및 스크롤 하단 이동
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('worklog_chat_history', JSON.stringify(messages));
    } else {
      sessionStorage.removeItem('worklog_chat_history');
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearChat = () => {
    setMessages([]);
    sessionStorage.removeItem('worklog_chat_history');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 로딩용 임시 봇 메시지 추가
    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        role: 'bot',
        content: '답변을 생성하고 있습니다. 잠시만 기다려주세요...',
        isLoading: true,
      },
    ]);

    try {
      const response = await askChatbot(userMessage.content);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? {
                id: botMsgId,
                role: 'bot',
                content: response.answer,
                isConflict: response.conflictDetected, // 규정 충돌 여부 저장
                isLoading: false,
              }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? {
                id: botMsgId,
                role: 'bot',
                content: '오류가 발생하여 답변을 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.',
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col bg-white">
        {/* 1. 상단 Header 영역 */}
        <header className="flex h-[100px] shrink-0 items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <AiLogo className="h-[60px] w-[60px]" />
            <div className="flex flex-col justify-center">
              <span className="text-[20px] font-bold text-[#17191A]">AI Chat</span>
              <span className="text-[14px] text-[#8C9499]">
                FAQ와 규정집을 바탕으로 답변드립니다.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClearChat}
              className="rounded-full border border-[#E8EEF2] px-6 py-2 text-[14px] font-medium text-[#464A4D] transition-colors hover:bg-gray-50"
            >
              새 대화
            </button>
          </div>
        </header>

        {/* 2. 대화 내용 영역 */}
        <div className="flex-1 overflow-y-auto p-10">
          {messages.length === 0 ? (
            // 아무 대화가 없을 때의 초기 화면
            <div className="flex h-full flex-col items-center justify-center">
              <h2 className="text-[32px] font-bold text-[#17191A]">무엇을 도와드릴까요?</h2>
              <p className="mt-4 text-[16px] text-[#8C9499]">
                FAQ와 규정집을 바탕으로 답변드립니다.
              </p>
            </div>
          ) : (
            // 대화 목록 렌더링
            <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="mr-4 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17191A]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21V7M12 7H7M12 7H17"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="5"
                          y="11"
                          width="14"
                          height="10"
                          rx="2"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  <div className={`flex max-w-[80%] flex-col gap-2`}>
                    <div
                      className={`whitespace-pre-wrap rounded-[16px] px-5 py-3 text-[15px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#F4F6F8] text-[#17191A]'
                          : 'bg-white text-[#17191A] outline outline-1 outline-[#E8EEF2]'
                      } ${msg.isLoading ? 'animate-pulse text-[#8C9499]' : ''}`}
                    >
                      {msg.content}
                    </div>

                    {/* 규정 상충 경고 UI */}
                    {msg.isConflict && (
                      <div className="mt-1 flex items-center gap-2 text-[13px] text-red-500">
                        <span>⚠️</span>
                        <span>
                          답변에 상충되는 규정이 포함되어 있습니다. 담당 부서에 정확한 내용을
                          확인해주세요.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 3. 입력창 영역 */}
        <div className="shrink-0 pb-10 pt-4">
          <div className="mx-auto flex h-[56px] w-full max-w-[800px] items-center gap-2 rounded-full border border-[#E8EEF2] bg-white px-6 shadow-sm focus-within:border-[#3B82F6]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isTyping}
              placeholder={isTyping ? '답변을 기다리고 있습니다...' : '질문을 입력해 주세요'}
              className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#A9AFB2] disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#17191A] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19V5M12 5L5 12M12 5L19 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
