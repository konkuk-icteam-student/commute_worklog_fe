import apiClient from '../../../../shared/apis/apiClient';

// ==========================================
// Type Definitions (명세서 기반 타입 정의)
// ==========================================

/** 분류(Category) 데이터 타입 */
export interface Category {
  categoryId: number;
  categoryName: string;
}

/** 분류 등록/수정 요청 타입 (공통 사용) */
export interface CategoryRequest {
  categoryName: string;
}

/** 1. 수정(PUT) 응답 타입 */
export interface UpdateCategoryResponse {
  timestamp: string;
  categoryId: number;
  updatedName: string;
}

/** 2. 삭제(DELETE) 응답 타입 */
export interface DeleteCategoryResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
  };
}

/** 3. 전체 조회(GET) 응답 타입 */
export interface GetCategoriesResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    categories: Category[];
  };
}

/** 4. 등록(POST) 응답 타입 */
export interface CreateCategoryResponse {
  timestamp: string;
  categoryId: number;
}

// ==========================================
// API Methods
// ==========================================

/**
 * 1. 분류 수정
 * Method: PUT
 * Path: /api/v1/categories/{categoryId}
 */
export const updateCategory = async (
  categoryId: number,
  data: CategoryRequest
): Promise<UpdateCategoryResponse> => {
  const response = await apiClient.put<UpdateCategoryResponse>(
    `/api/v1/categories/${categoryId}`,
    data
  );
  return response.data;
};

/**
 * 2. 분류 삭제
 * Method: DELETE
 * Path: /api/v1/categories/{categoryId}
 */
export const deleteCategory = async (categoryId: number): Promise<DeleteCategoryResponse> => {
  const response = await apiClient.delete<DeleteCategoryResponse>(
    `/api/v1/categories/${categoryId}`
  );
  return response.data;
};

/**
 * 3. 분류 전체 조회
 * Method: GET
 * Path: /api/v1/categories
 */
export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const response = await apiClient.get<GetCategoriesResponse>('/api/v1/categories');
  return response.data;
};

/**
 * 4. 분류 등록
 * Method: POST
 * Path: /api/v1/categories
 */
export const createCategory = async (data: CategoryRequest): Promise<CreateCategoryResponse> => {
  const response = await apiClient.post<CreateCategoryResponse>('/api/v1/categories', data);
  return response.data;
};
