import Lottie from 'lottie-react';
import type { CSSProperties } from 'react';

interface LottieAnimationProps {
  animationData: any;
  width?: string | number;
  height?: string | number;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Lottie 애니메이션 컴포넌트
 * @param animationData - JSON 애니메이션 데이터
 * @param width - 애니메이션 너비 (기본값: 300px)
 * @param height - 애니메이션 높이 (기본값: 300px)
 * @param loop - 반복 재생 (기본값: true)
 * @param autoplay - 자동 재생 (기본값: true)
 * @param speed - 재생 속도 (기본값: 1)
 * @param className - CSS 클래스명
 * @param style - 인라인 스타일
 */
const LottieAnimation = ({
  animationData,
  width = 300,
  height = 300,
  loop = true,
  autoplay = true,
  speed = 1,
  className,
  style,
}: LottieAnimationProps) => {
  const defaultStyle: CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      speed={speed}
      style={defaultStyle}
      className={className}
    />
  );
};

export default LottieAnimation;
