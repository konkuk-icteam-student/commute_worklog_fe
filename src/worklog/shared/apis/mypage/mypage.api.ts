import apiClient from '@/shared/apis/apiClient'; // 프로젝트 경로에 맞게 수정해주세요!

// ==========================================
// 1. Type Definitions (알맹이 데이터 모델)
// ==========================================

/** 마이페이지 프로필 정보 타입 */
export interface MyPageProfile {
  timestamp: string;
  name: string;
  email: string;
  organizationId: number;
  organizationName: string;
  publishedCount: number; // 작성 완료 업무일지 수
  draftCount: number; // 임시저장 업무일지 수
}

/** 마이페이지 업무일지(FAQ) 리스트 아이템 타입 */
export interface MyPageFaqItem {
  faqId: number;
  title: string;
  updatedDate: string;
}

/** 마이페이지 업무일지(FAQ) 목록 정보 타입 */
export interface MyPageFaqList {
  timestamp: string;
  faqs: MyPageFaqItem[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

// ==========================================
// 2. Server Response Types (껍질 포함)
// ==========================================

export interface MyPageProfileResponse {
  isSuccess: boolean;
  message: string;
  details: MyPageProfile;
}

export interface MyPageFaqListResponse {
  isSuccess: boolean;
  message: string;
  details: MyPageFaqList;
}

// ==========================================
// 3. API Methods
// ==========================================

/**
 * [1] 마이페이지 프로필 조회
 * Method: GET
 * Path: /api/mypage
 */
export const getMyPageProfile = async (): Promise<MyPageProfile> => {
  const response = await apiClient.get<MyPageProfileResponse>('/api/mypage');

  if (!response.data.isSuccess || !response.data.details) {
    throw new Error(response.data.message || '마이페이지 정보를 불러오는데 실패했습니다.');
  }

  return response.data.details;
};

/**
 * [2] 내가 작성한 업무일지(작성 완료) 목록 조회
 * Method: GET
 * Path: /api/mypage/faqs
 * @param page 프론트엔드 기준 페이지 (1부터 시작)
 */
export const getMyPagePublishedFaqs = async (
  page: number = 1,
  keyword?: string
): Promise<MyPageFaqList> => {
  const serverPage = Math.max(0, page - 1);
  const response = await apiClient.get<MyPageFaqListResponse>('/api/mypage/faqs', {
    params: { page: serverPage, keyword: keyword || undefined }, // 💡 검색어 추가
  });
  if (!response.data.isSuccess || !response.data.details) {
    throw new Error(response.data.message || '작성 완료 목록을 불러오는데 실패했습니다.');
  }
  const details = response.data.details;
  return {
    ...details,
    currentPage: details.currentPage + 1,
    totalPages: details.totalPages === 0 ? 1 : details.totalPages,
    faqs: details.faqs || [],
  };
};

/**
 * [3] 임시저장 업무일지 목록 조회
 * Method: GET
 * Path: /api/mypage/faqs/drafts
 * @param page 프론트엔드 기준 페이지 (1부터 시작)
 */
export const getMyPageDraftFaqs = async (
  page: number = 1,
  keyword?: string
): Promise<MyPageFaqList> => {
  const serverPage = Math.max(0, page - 1);
  const response = await apiClient.get<MyPageFaqListResponse>('/api/mypage/faqs/drafts', {
    params: { page: serverPage, keyword: keyword || undefined }, // 💡 검색어 추가
  });
  if (!response.data.isSuccess || !response.data.details) {
    throw new Error(response.data.message || '임시저장 목록을 불러오는데 실패했습니다.');
  }
  const details = response.data.details;
  return {
    ...details,
    currentPage: details.currentPage + 1,
    totalPages: details.totalPages === 0 ? 1 : details.totalPages,
    faqs: details.faqs || [],
  };
};
