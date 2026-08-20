import apiClient from '../../../../shared/apis/apiClient';

export interface RegulationSource {
  source: string;
  page: number;
  chunkIndex: number;
  score: number;
}

export interface FaqSource {
  faqId: number;
  chunkIndex: number;
  score: number;
}

export interface ChatQueryDetails {
  timestamp: string;
  answer: string;
  regulationSources: RegulationSource[];
  faqSources: FaqSource[];
  conflictDetected: boolean;
}

export interface ChatQueryServerResponse {
  isSuccess: boolean;
  message: string;
  details: ChatQueryDetails;
}

/**
 * AI 챗봇에게 질문을 던지는 API
 * LLM 호출로 인해 최대 120초가 소요될 수 있으므로 타임아웃을 130초로 설정합니다.
 */
export const askChatbot = async (query: string): Promise<ChatQueryDetails> => {
  const response = await apiClient.post<ChatQueryServerResponse>(
    '/api/chat/query',
    { query },
    { timeout: 130000 } // 130초 타임아웃 설정
  );

  if (!response.data.isSuccess || !response.data.details) {
    throw new Error(response.data.message || '챗봇 질의에 실패했습니다.');
  }

  return response.data.details;
};
