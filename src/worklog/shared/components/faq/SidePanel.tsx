import blueX from '../../assets/blueX.svg';
import house from './house.svg';
import rightArrow from '../../assets/rightarrow.svg';
//import x from './x.svg'
export interface TabData {
  id: string | number;
  label: string; // [추가] 탭 상단에 보여줄 짧은 이름
  title?: string; // [기존] 본문에 보여줄 전체 이름
  type: 'write' | 'detail';
  content?: React.ReactNode;
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
                {tab.label}
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
            <div className="flex flex-row items-center gap-[5px]">
              <img src={house} alt="집 아이콘" className="" />
              <span className="text-[14px] font-[700] text-[#464A4D]">FAQ</span>
              <img src={rightArrow} alt="오른쪽 화살표" />
              <span className="text-[14px] font-[400] text-[#A9AFB2]">department</span>
            </div>
            <h2 className="color-[#17191A] mb-4 text-[32px] font-[700]">
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
