import apiClient from '../../../../shared/apis/apiClient';

// ==========================================
// Type Definitions (FAQ 데이터 모델)
// ==========================================

/** 담당자 요약 정보 타입 (상세 조회용) */
export interface ManagerSummary {
  managerName: string;
  teamName: string;
  categoryName: string;
}

/** FAQ 목록의 단일 항목 타입 */
export interface FaqListItem {
  faqId: number;
  title: string;
  updatedDate: string;
  deletedFlag: boolean;
}

// ==========================================
// Request / Response Types
// ==========================================

/** [공통] FAQ 등록/수정 요청 타입 */
export interface FaqRequest {
  title: string;
  complainantName: string;
  answer: string;
  etc: string;
  categoryId: number;
  content: string;
}

/** 1. FAQ 상세 조회 응답 타입 */
export interface FaqDetailResponse {
  timestamp: string;
  faqId: number;
  title: string;
  categoryName: string;
  deletedFlag: boolean;
  complainantName: string;
  writerName: string;
  answer: string;
  etc: string;
  pastManagers: ManagerSummary[];
  currentManagers: ManagerSummary[];
  editedDates: string[]; // ["2024-11-01", "2024-11-10"]
  deletedAt: string | null;
}

/** 4. FAQ 목록 조회 요청 파라미터 타입 */
export interface GetFaqListParams {
  teamId?: number;
  categoryId?: number;
  keyword?: string;
  searchScope?: 'TITLE_CONTENT' | 'TITLE' | 'CONTENT' | 'WRITER';
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  page?: number; // Default: 0
}

/** 4. FAQ 목록 조회 응답 타입 */
export interface FaqListResponse {
  timestamp: string;
  faqs: FaqListItem[];
  page: number;
  totalPages: number;
}

/** [공통] 성공 응답 타입 (등록, 수정, 삭제) */
export interface FaqSuccessResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
  };
}

// ==========================================
// API Methods
// ==========================================

/**
 * 1. FAQ 상세 조회
 * Method: GET
 * Path: /api/v1/faq/{faqId}
 * Query: date (yyyy-MM-dd)
 */
export const getFaqDetail = async (faqId: number, date: string): Promise<FaqDetailResponse> => {
  const response = await apiClient.get<FaqDetailResponse>(`/api/v1/faq/${faqId}`, {
    params: { date },
  });
  return response.data;
};

/**
 * 2. FAQ 수정
 * Method: PUT
 * Path: /api/v1/faq/{faqId}
 */
export const updateFaq = async (faqId: number, data: FaqRequest): Promise<FaqSuccessResponse> => {
  const response = await apiClient.put<FaqSuccessResponse>(`/api/v1/faq/${faqId}`, data);
  return response.data;
};

/**
 * 3. FAQ 삭제
 * Method: DELETE
 * Path: /api/v1/faq/{faqId}
 */
export const deleteFaq = async (faqId: number): Promise<FaqSuccessResponse> => {
  const response = await apiClient.delete<FaqSuccessResponse>(`/api/v1/faq/${faqId}`);
  return response.data;
};

/**
 * 4. FAQ 목록 조회
 * Method: GET
 * Path: /api/v1/faq
 */
export const getFaqList = async (params?: GetFaqListParams): Promise<FaqListResponse> => {
  const serverPage = Math.max(0, (params?.page || 1) - 1);
  const response = await apiClient.get<FaqListResponse>('/api/v1/faq', {
    params: {
      ...params,
      page: serverPage, // 기본값 0 설정
    },
  });
  return {
    ...response.data,
    page: response.data.page + 1,
  };
};

/**
 * 5. FAQ 작성 (등록)
 * Method: POST
 * Path: /api/v1/faq
 */
export const createFaq = async (data: FaqRequest): Promise<FaqSuccessResponse> => {
  const response = await apiClient.post<FaqSuccessResponse>('/api/v1/faq', data);
  return response.data;
};
