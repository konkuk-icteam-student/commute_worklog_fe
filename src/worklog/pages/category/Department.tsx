import { useState, useEffect } from 'react';
import Post2 from '@/worklog/shared/components/posting/Post2';
import MainLayout from '@/worklog/shared/components/layout/MainLayout'; // MainLayout import
import DeleteConfirmationModal from '@/worklog/shared/components/modal/DeleteConfirmationModal';
import DeleteFailureModal from '@/worklog/shared/components/modal/DeleteFailureModal';
import { createTeam, getTeams, deleteTeam, type Team } from '../../shared/apis/team/team.api';

const Department = () => {
  const [teams, setTeams] = useState<Team[]>([]); // 서버에서 받아온 소속 리스트
  const [inputValue, setInputValue] = useState(''); // 입력창 값

  // 모달 상태
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null); // 삭제할 대상 정보
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  // 2. 초기 데이터 조회 (GET)
  const fetchTeams = async () => {
    console.log('🔄 [Action] 소속 목록 조회 시작 (fetchTeams)'); // [로그] 조회 시작
    try {
      const response = await getTeams();
      console.log('📥 [API Response] 조회된 소속 리스트:', response.details.teams); // [로그] 응답 데이터 확인
      setTeams(response.details.teams || []);
    } catch (error) {
      console.error('소속 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // 3. 소속 등록 (POST)
  const handleAddTeam = async () => {
    console.log('🖱️ [Action] 추가하기 버튼 클릭 / 입력값:', inputValue);
    if (!inputValue.trim()) {
      alert('소속 이름을 입력해주세요.');
      return;
    }

    try {
      const requestData = { teamName: inputValue };
      console.log('📤 [API Request] 소속 등록 요청 데이터:', requestData);

      // 3. API 호출
      const response = await createTeam(requestData);
      console.log('✅ [API Success] 소속 등록 성공:', response);

      setInputValue(''); // 입력창 초기화
      await fetchTeams(); // 목록 새로고침
    } catch (error) {
      console.error('소속 등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  // 4. 삭제 요청 (휴지통 클릭 시)
  const handleDeleteRequest = (id: number, name: string) => {
    console.log(`[Action] 삭제 요청 - ID: ${id}, Name: ${name}`);
    setDeleteTarget({ id, name });
    setIsConfirmModalOpen(true);
  };

  // 5. 삭제 확인 (모달에서 '삭제하기' 클릭 시 - DELETE)
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    console.log(`[API Request] 소속 삭제 요청 ID: ${deleteTarget.id}`);

    try {
      const response = await deleteTeam(deleteTarget.id);
      console.log('✅ [API Success] 소속 삭제 결과:', response);

      if (response.isSuccess) {
        // 성공 시: 모달 닫고 목록 새로고침
        setIsConfirmModalOpen(false);
        setDeleteTarget(null);
        await fetchTeams();
      } else {
        console.log('⚠️ [API Warning] 삭제 실패 (서버 로직):', response.message);
        // 실패 시 (isSuccess가 false인 경우): 실패 모달 띄우기
        setIsConfirmModalOpen(false); // 확인 모달은 닫고
        setIsFailModalOpen(true); // 실패 모달 열기
      }
    } catch (error) {
      // API 에러 발생 시 (4xx, 5xx 등)
      console.error('삭제 요청 실패:', error);
      setIsConfirmModalOpen(false);
      setIsFailModalOpen(true);
    }
  };
  //duelqnxj
  return (
    <MainLayout showPencil={false}>
      <div className="flex h-full flex-col">
        {/* 1. Title Section */}
        <section className="flex h-[180px] shrink-0 flex-col items-center justify-center border-b border-[#E8EEF2]">
          <div className="flex w-full max-w-[1200px] flex-col gap-8 px-4">
            <h1 className="text-center text-[40px] font-bold">소속</h1>

            <div className="flex items-center justify-center gap-3">
              {/* Search Bar (등록 인풋으로 사용) */}
              <div className="flex h-[48px] w-[480px] items-center gap-2 rounded-[24px] border border-[#E8EEF2] px-4 focus-within:border-blue-400">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()} // 엔터키로도 등록 가능
                  placeholder="소속 이름을 입력하세요" // placeholder 변경 제안
                  className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#8C9499]"
                />
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddTeam}
                className="h-[48px] rounded-[24px] border border-[#E8EEF2] px-6 text-[16px] font-[700] text-[#464A4D] hover:bg-gray-50"
              >
                추가하기
              </button>
            </div>
          </div>
        </section>

        {/* 2. Contents Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
            {teams.length > 0 ? (
              teams.map((team) => (
                <Post2
                  key={team.teamId}
                  id={team.teamId}
                  title={team.teamName}
                  onDelete={handleDeleteRequest}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-400">등록된 소속이 없습니다.</div>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* 1. 삭제 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={isConfirmModalOpen}
        teamName={deleteTarget?.name || ''}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* 2. 삭제 실패 모달 */}
      <DeleteFailureModal isOpen={isFailModalOpen} onClose={() => setIsFailModalOpen(false)} />
    </MainLayout>
  );
};

export default Department;
