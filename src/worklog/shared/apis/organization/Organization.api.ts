import apiClient from '../../../../shared/apis/apiClient';

// ==========================================
// Type Definitions (명세서 기반 타입 정의)
// ==========================================

/** 소속(Organization) 데이터 타입 */
export interface Organization {
  organizationId: number;
  organizationName: string;
}

/** 소속 등록 요청 타입 */
export interface CreateOrganizationRequest {
  organizationName: string;
}

/** 소속 등록 응답 타입 */
export interface CreateOrganizationResponse {
  timestamp: string;
  organizationId: number;
}

/** 소속 조회 응답 타입 */
export interface GetOrganizationsResponse {
  isSuccess: boolean;
  message: string;
  details: {
    timestamp: string;
    organizations: Organization[];
  };
}

/** 소속 삭제 응답 타입 */
export interface DeleteOrganizationResponse {
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
 * 1. 조직 등록
 * Method: POST
 * Path: /api/organization
 */
export const createOrganization = async (
  data: CreateOrganizationRequest
): Promise<CreateOrganizationResponse> => {
  const response = await apiClient.post<CreateOrganizationResponse>('/api/organization', data);
  return response.data;
};

/**
 * 2. 소속 조회
 * Method: GET
 * Path: /api/organization
 */
export const getOrganizations = async (): Promise<GetOrganizationsResponse> => {
  const response = await apiClient.get<GetOrganizationsResponse>('/api/organization');
  return response.data;
};

/**
 * 3. 소속 삭제
 * Method: DELETE
 * Path: /api/v1/organization/{organizationId}
 */
export const deleteOrganization = async (
  organizationId: number
): Promise<DeleteOrganizationResponse> => {
  const response = await apiClient.delete<DeleteOrganizationResponse>(
    `/api/organization/${organizationId}`
  );
  return response.data;
};
