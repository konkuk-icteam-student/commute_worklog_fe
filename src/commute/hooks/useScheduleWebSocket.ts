import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ScheduleUpdateMessage, ScheduleUpdateItem } from '../shared/types/schedule.types';

interface UseScheduleWebSocketProps {
  onScheduleUpdate: (updates: ScheduleUpdateItem[]) => void;
  enabled?: boolean; // 연결 활성화 여부
}

/**
 * 스케줄 실시간 업데이트를 위한 웹소켓 훅
 */
export const useScheduleWebSocket = ({
  onScheduleUpdate,
  enabled = true,
}: UseScheduleWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);
  const isConnectedRef = useRef(false);

  // 웹소켓 연결
  const connect = useCallback(() => {
    if (!enabled || isConnectedRef.current) return;

    try {
      // 백엔드로 직접 연결 (개발/프로덕션 모두)
      const backendUrl = import.meta.env.VITE_PROXY_TARGET ||
                         import.meta.env.VITE_API_BASE_URL ||
                         'http://localhost:8080';

      const wsUrl = `${backendUrl}/ws`;
      console.log('[WebSocket] Connecting to:', wsUrl);

      // SockJS 소켓 생성
      const socket = new SockJS(wsUrl);

      // STOMP 클라이언트 생성
      const client = new Client({
        webSocketFactory: () => socket as unknown as WebSocket,
        reconnectDelay: 5000, // 재연결 딜레이 (5초)
        heartbeatIncoming: 10000, // 서버 → 클라이언트 heartbeat (10초)
        heartbeatOutgoing: 10000, // 클라이언트 → 서버 heartbeat (10초)
        debug: (str) => {
          console.log('[WebSocket Debug]', str);
        },
        onConnect: () => {
          console.log('[WebSocket] Connected');
          isConnectedRef.current = true;

          // /topic/schedule-updates 구독
          client.subscribe('/topic/schedule-updates', (message) => {
            try {
              const data: ScheduleUpdateMessage = JSON.parse(message.body);

              if (data.type === 'SCHEDULE_UPDATED' && data.updates) {
                console.log('[WebSocket] Received schedule update:', data.updates);
                onScheduleUpdate(data.updates);
              }
            } catch (error) {
              console.error('[WebSocket] Failed to parse message:', error);
            }
          });
        },
        onDisconnect: () => {
          console.log('[WebSocket] Disconnected');
          isConnectedRef.current = false;
        },
        onStompError: (frame) => {
          console.error('[WebSocket] STOMP error:', frame.headers['message']);
          console.error('[WebSocket] Error details:', frame.body);
        },
      });

      clientRef.current = client;
      client.activate();
    } catch (error) {
      console.error('[WebSocket] Connection error:', error);
    }
  }, [enabled, onScheduleUpdate]);

  // 웹소켓 연결 해제
  const disconnect = useCallback(() => {
    if (clientRef.current && clientRef.current.active) {
      clientRef.current.deactivate();
      clientRef.current = null;
      isConnectedRef.current = false;
      console.log('[WebSocket] Disconnected manually');
    }
  }, []);

  // 컴포넌트 마운트 시 연결, 언마운트 시 연결 해제
  useEffect(() => {
    if (enabled) {
      connect();
    }

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]); // enabled 변경 시에만 재연결

  return {
    isConnected: isConnectedRef.current,
    disconnect,
  };
};
