import blueX from '../../assets/blueX.svg';

export interface TabData {
  id: string | number; // 탭 고유 ID
  title: string; // 탭 제목
  type: 'write' | 'detail'; // 탭 종류 (작성/상세)
  content?: React.ReactNode; // 나중에 들어갈 데이터
}

interface SidePanelProps {
  tabs: TabData[];
  activeTabId: string | number;
  onTabClick: (id: string | number) => void;
  onClose: (id: string | number) => void; // 닫기 버튼 (임시)
}

const SidePanel = ({ tabs, activeTabId, onTabClick, onClose }: SidePanelProps) => {
  const activeTab = tabs.find((t) => t.id === activeTabId);
  return (
    <div className="flex h-full flex-col border-r border-[#E8EEF2] bg-white">
      {/* 1. 탭 영역 (사다리꼴 모양 구현) */}
      <div className="flex h-[40px] w-full items-end overflow-hidden bg-[#F4F6F8] px-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`group relative -mr-[14px] flex h-[36px] min-w-[120px] max-w-[160px] cursor-pointer items-center justify-center px-6 transition-all ${isActive ? 'z-10' : 'z-0 hover:z-[5]'} `}
            >
              {/* 사다리꼴 배경 (skew 활용) */}
              <div
                className={`absolute inset-0 top-0 h-full w-full transform rounded-t-[8px] border-l border-r border-t ${
                  isActive
                    ? 'border-[#E8EEF2] bg-white'
                    : 'border-transparent bg-[#E8EEF2] hover:bg-[#E0E4E8]'
                } `}
                style={{ transform: 'skewX(20deg)', transformOrigin: 'bottom left' }}
              />

              {/* 탭 제목 (skew된 배경과 달리 텍스트는 정방향 유지) */}
              <span
                className={`relative block truncate text-[13px] font-medium ${isActive ? 'text-[#17191A]' : 'text-[#8C9499]'} `}
              >
                {tab.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. 컨텐츠 영역 (탭에 따라 내용 바뀜) */}
      <div className="relative h-full flex-1 overflow-y-auto p-6">
        {activeTab && (
          <button
            onClick={() => onClose(activeTabId)}
            className="absolute right-4 top-4 flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: '#E6E8FF',
            }}
          >
            <img src={blueX} alt="닫기" />
          </button>
        )}

        {/* 현재 활성화된 탭의 내용 표시 */}
        {activeTab ? (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">
              {activeTab.title} {/* 여기서도 바로 activeTab 변수 사용 가능 */}
            </h2>

            <div className="w-full">
              {activeTab.content || (
                <div className="flex h-[200px] w-full items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                  준비 중인 화면입니다.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            선택된 탭이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
