import apiClient from '../../../../shared/apis/apiClient';

export interface RecommendCategoryRequest {
  title: string;
  content: string;
}

export interface RecommendedCategory {
  id: number;
  name: string;
}

export interface RecommendCategoryResponse {
  timestamp: string;
  categories: RecommendedCategory[];
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
