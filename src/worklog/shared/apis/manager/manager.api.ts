import apiClient from '../../../../shared/apis/apiClient';

// ==========================================
// Type Definitions
// ==========================================

/** 담당자(Manager) 데이터 타입 */
export interface Manager {
  categoryId: number;
  categoryName: string;
  managerId: number;
  managerName: string;
  managerFavorite: boolean;
  organizationId: number;
  organizationName: string;
  phonenum: string;
}

/** 1. 담당자 등록 요청 타입 */
export interface CreateManagerRequest {
  name: string;
  organizationId: number;
  categoryId: number;
  phonenum: string;
}

/** 2. 담당자 목록 조회 요청 파라미터 타입 */
export interface GetManagersParams {
  categoryId?: number;
  organizationId?: number;
  favoriteOnly?: boolean; // default: false
}

// --- 응답 타입 (서버 공통 응답 구조 반영) ---

/** 담당자 등록 응답 */
export interface CreateManagerResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    managerId: number;
    categoryId: number;
  };
}

/** 담당자 목록 조회 응답 */
export interface GetManagersResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    managers: Manager[];
  };
}

/** 담당자 삭제 응답 */
export interface DeleteManagerResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
  };
}

/** 즐겨찾기 토글 응답 */
export interface ToggleFavoriteResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    managerId: number;
    categoryId: number;
    favorite: boolean;
  };
}

// ==========================================
// API Methods
// ==========================================

/**
 * 1. 담당자 등록
 * Method: POST
 * Path: /api/manager
 */
export const createManager = async (data: CreateManagerRequest): Promise<CreateManagerResponse> => {
  const response = await apiClient.post<CreateManagerResponse>('/api/manager', data);
  return response.data;
};

/**
 * 2. 담당자 목록 조회
 * Method: GET
 * Path: /api/manager
 * Params: categoryId, organizationId, favoriteOnly
 */
export const getManagers = async (params?: GetManagersParams): Promise<GetManagersResponse> => {
  const response = await apiClient.get<GetManagersResponse>('/api/manager', {
    params: {
      ...params,
      favoriteOnly: params?.favoriteOnly ?? false, // 기본값 false 설정
    },
  });
  return response.data;
};

/**
 * 3. 담당자 삭제
 * Method: DELETE
 * Path: /api/manager/{managerId}
 */
export const deleteManager = async (managerId: number): Promise<DeleteManagerResponse> => {
  const response = await apiClient.delete<DeleteManagerResponse>(`/api/manager/${managerId}`);
  return response.data;
};

/**
 * 4. 담당자 즐겨찾기 등록 및 해제
 * Method: PATCH
 * Path: /api/manager/{managerId}/category/{categoryId}
 * Query: favorite (boolean)
 */
export const toggleFavorite = async (
  managerId: number,
  categoryId: number,
  favorite: boolean
): Promise<ToggleFavoriteResponse> => {
  const response = await apiClient.patch<ToggleFavoriteResponse>(
    `/api/manager/${managerId}/category/${categoryId}`,
    null, // Patch body 없음
    {
      params: { favorite },
    }
  );
  return response.data;
};
