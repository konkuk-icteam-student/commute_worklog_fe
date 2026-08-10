import apiClient from '../../../../shared/apis/apiClient';
import type { FaqListItem } from './faq.api';
export interface RecommendCategoryRequest {
  title: string;
  content: string;
}

export interface RecommendedCategory {
  id: number;
  name: string;
}

export interface RecommendCategoryResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    categories: RecommendedCategory[];
  };
}

// ==========================================
// 2. FAQ AI 검색 관련 타입 정의
// ==========================================

/** FAQ AI 검색 요청 파라미터 */
export interface SearchFaqAiRequest {
  organizationId?: number; // 소속 필터 (선택)
  categoryId?: number; // 분류 필터 (선택)
  keyword?: string; // 검색어 (선택)
  startDate?: string; // 시작 날짜 (YYYY-MM-DD) (선택)
  endDate?: string; // 종료 날짜 (YYYY-MM-DD) (선택)
  page?: number; // 페이지 번호 (보통 서버 기준 0부터 시작)
}

/**
 * FAQ AI 검색 응답 타입
 * (Swagger에 details 내부가 생략되어 있으나, 일반적인 FAQ 페이징 리스트 구조를 따름)
 */
export interface SearchFaqAiResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    faqs: FaqListItem[]; // 필요 시 '@/worklog/shared/apis/faq/faq.api'에서 FaqListItem 타입을 import하여 교체하세요.
    currentPage: number;
    totalPages: number;
    totalElements: number;
  };
}

/**
 * FAQ AI 카테고리 자동 추천
 * Method: POST
 * Path: /api/faq/ai/category-recommend
 */
export const recommendCategory = async (
  data: RecommendCategoryRequest
): Promise<RecommendCategoryResponse> => {
  const response = await apiClient.post<RecommendCategoryResponse>(
    '/api/faq/ai/category-recommend',
    data
  );
  return response.data;
};

// ==========================================
// API Methods
// ==========================================

/**
 * FAQ AI 검색
 * 키워드로 제목+내용을 검색한 후 AI가 의미적 유사성을 기준으로 결과를 재정렬합니다.
 * Method: GET
 * Path: /api/faq/ai/search
 */
export const searchFaqAi = async (params: SearchFaqAiRequest): Promise<SearchFaqAiResponse> => {
  const response = await apiClient.get<SearchFaqAiResponse>(
    '/api/faq/ai/search',
    { params } // GET 요청의 쿼리 스트링으로 파라미터 자동 변환
  );

  return response.data;
};
