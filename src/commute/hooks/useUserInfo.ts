import { useState, useEffect } from 'react';
import { getMyInfo } from '../shared/apis/user.api';
import type { MyInfoDetails } from '../shared/types/user.types';

interface UserInfoState {
  userInfo: MyInfoDetails | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * 사용자 정보를 가져오는 커스텀 훅
 */
export const useUserInfo = () => {
  const [state, setState] = useState<UserInfoState>({
    userInfo: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await getMyInfo();

        if (!isMounted) return;

        if (response.isSuccess && response.details) {
          setState({
            userInfo: response.details,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            userInfo: null,
            isLoading: false,
            error: response.message || '사용자 정보를 불러올 수 없습니다.',
          });
        }
      } catch (error) {
        if (!isMounted) return;

        console.error('사용자 정보 조회 에러:', error);
        setState({
          userInfo: null,
          isLoading: false,
          error: '사용자 정보를 불러오는 중 오류가 발생했습니다.',
        });
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
