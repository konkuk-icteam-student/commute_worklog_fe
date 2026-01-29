import apiClient from '../../../../shared/apis/apiClient';

// ==========================================
// Type Definitions (명세서 기반 타입 정의)
// ==========================================

/** 소속(Team) 데이터 타입 */
export interface Team {
  teamId: number;
  teamName: string;
}

/** 소속 등록 요청 타입 */
export interface CreateTeamRequest {
  teamName: string;
}

/** 소속 등록 응답 타입 */
export interface CreateTeamResponse {
  timestamp: string;
  teamId: number;
}

/** 소속 조회 응답 타입 */
export interface GetTeamsResponse {
  timestamp: string;
  teams: Team[];
}

/** 소속 삭제 응답 타입 */
export interface DeleteTeamResponse {
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
 * 1. 소속 등록
 * Method: POST
 * Path: /api/v1/team
 */
export const createTeam = async (data: CreateTeamRequest): Promise<CreateTeamResponse> => {
  const response = await apiClient.post<CreateTeamResponse>('/api/v1/team', data);
  return response.data;
};

/**
 * 2. 소속 조회
 * Method: GET
 * Path: /api/v1/team
 */
export const getTeams = async (): Promise<GetTeamsResponse> => {
  const response = await apiClient.get<GetTeamsResponse>('/api/v1/team');
  return response.data;
};

/**
 * 3. 소속 삭제
 * Method: DELETE
 * Path: /api/v1/team/{teamId}
 */
export const deleteTeam = async (teamId: number): Promise<DeleteTeamResponse> => {
  const response = await apiClient.delete<DeleteTeamResponse>(`/api/v1/team/${teamId}`);
  return response.data;
};
