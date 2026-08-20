import apiClient from '../../../../shared/apis/apiClient';

// ==========================================
// Type Definitions (FAQ 데이터 모델)
// ==========================================

/** 담당자 요약 정보 타입 (상세 조회용) */
export interface ManagerSummary {
  managerName: string;
  organizationName: string;
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
  answer: string; // HTML string
  etc: string;
  categoryIds: number[];
  content: string; // HTML string
  fileUrls: string[];
  relatedFaqIds: number[];
}

/** 1. FAQ 상세 조회 응답 타입 (🔥 최신 명세 반영) */
export interface FaqDetailResponse {
  timestamp: string;
  faqId: number;
  title: string;
  categoryNames: string[]; // [수정] 단일 string -> 배열로 변경됨
  deletedFlag: boolean;
  complainantName: string;
  writerName: string;
  content: string; // [추가] 상세 본문 내용 (HTML)
  answer: string;
  etc: string;
  files: {
    // [추가] 첨부파일 목록
    url: string;
    originalName: string;
  }[];
  pastManagers: ManagerSummary[];
  currentManagers: ManagerSummary[];
  editedDates: string[]; // ["2024-11-01", "2024-11-10"]
  deletedAt: string | null;
  relatedFaqs: {
    // [추가] 관련 FAQ 목록
    faqId: number;
    title: string;
    updatedDate: string;
  }[];
}

/** 4. FAQ 목록 조회 요청 파라미터 타입 */
export interface GetFaqListParams {
  organizationId?: number;
  categoryId?: number;
  keyword?: string;
  searchScope?: 'TITLE_CONTENT' | 'TITLE' | 'CONTENT' | 'WRITER';
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  page?: number; // Default: 0
}

export interface FaqListServerResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    faqs: FaqListItem[];
    page: number;
    totalPages: number;
  };
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

/** [추가됨] 파일 및 이미지 업로드 응답 타입 */
export interface UploadResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    imageUrl?: string; // 이미지 업로드 시 서버가 주는 키값
    fileUrl?: string; // 일반 파일 업로드 시를 대비한 키값
    url?: string;
  };
}

export interface FaqDetailServerResponse {
  isSuccess: boolean;
  message: string;
  details: FaqDetailResponse | null;
}

// ==========================================
// API Methods
// ==========================================

export const getFaqDetail = async (faqId: number, date: string): Promise<FaqDetailResponse> => {
  const response = await apiClient.get<FaqDetailServerResponse>(`/api/faq/${faqId}`, {
    params: { date },
  });

  // 서버에서 실패했다고 보내거나 details가 없으면 에러를 던져서 UI에서 처리하게 합니다.
  if (!response.data.isSuccess || !response.data.details) {
    throw new Error(response.data.message || '상세 조회에 실패했습니다.');
  }

  return response.data.details;
};

export const updateFaq = async (faqId: number, data: FaqRequest): Promise<FaqSuccessResponse> => {
  const response = await apiClient.put<FaqSuccessResponse>(`/api/faq/${faqId}`, data);
  return response.data;
};

export const deleteFaq = async (faqId: number): Promise<FaqSuccessResponse> => {
  const response = await apiClient.delete<FaqSuccessResponse>(`/api/faq/${faqId}`);
  return response.data;
};

export const getFaqList = async (params?: GetFaqListParams): Promise<FaqListResponse> => {
  const serverPage = Math.max(0, (params?.page || 1) - 1);

  const response = await apiClient.get<FaqListServerResponse>('/api/faq', {
    params: {
      ...params,
      page: serverPage,
    },
  });

  const { timestamp, faqs, page, totalPages } = response.data.details;

  return {
    timestamp,
    faqs: faqs || [], // 안전장치: 혹시라도 null이 오면 빈 배열로 처리
    page: page + 1, // 프론트엔드 UI용 1-based index 보정
    totalPages: totalPages === 0 ? 1 : totalPages,
  };
};

export const createFaq = async (data: FaqRequest): Promise<FaqSuccessResponse> => {
  const response = await apiClient.post<FaqSuccessResponse>('/api/faq', data);
  return response.data;
};

export const uploadFaqImage = async (imageFile: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('imageFile', imageFile);
  const response = await apiClient.post<UploadResponse>('/api/faq/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const uploadFaqFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<UploadResponse>('/api/faq/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// FAQ 최초 임시저장
export const createFaqDraft = async (data: FaqRequest): Promise<FaqSuccessResponse> => {
  const response = await apiClient.post<FaqSuccessResponse>('/api/faq/draft', data);
  return response.data;
};

// 임시저장 FAQ 조회
export const getFaqDraftDetail = async (faqId: number): Promise<FaqDetailResponse> => {
  const response = await apiClient.get<FaqDetailServerResponse>(`/api/faq/${faqId}/draft`);

  if (!response.data.isSuccess || !response.data.details) {
    throw new Error(response.data.message || '임시저장 상세 조회에 실패했습니다.');
  }

  return response.data.details;
};
