import LottieAnimation from '@/shared/components/LottieAnimation';
import sampleLoading from '@/shared/assets/animations/sample-loading.json';

/**
 * Lottie 애니메이션 예시 페이지
 *
 * 사용법:
 * 1. LottieFiles(https://lottiefiles.com)에서 JSON 파일 다운로드
 * 2. src/shared/assets/animations/ 폴더에 저장
 * 3. import해서 animationData로 전달
 */
const LottieExample = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Lottie 애니메이션 예시
        </h1>

        {/* 기본 사용 예시 */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            1. 기본 로딩 애니메이션
          </h2>
          <div className="flex justify-center">
            <LottieAnimation
              animationData={sampleLoading}
              width={150}
              height={150}
              loop={true}
              autoplay={true}
            />
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            기본 설정으로 자동 재생, 무한 반복
          </p>
        </section>

        {/* 다양한 크기 */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            2. 다양한 크기
          </h2>
          <div className="flex items-center justify-around gap-4">
            <div className="text-center">
              <LottieAnimation
                animationData={sampleLoading}
                width={80}
                height={80}
              />
              <p className="text-sm text-gray-500 mt-2">Small (80px)</p>
            </div>
            <div className="text-center">
              <LottieAnimation
                animationData={sampleLoading}
                width={120}
                height={120}
              />
              <p className="text-sm text-gray-500 mt-2">Medium (120px)</p>
            </div>
            <div className="text-center">
              <LottieAnimation
                animationData={sampleLoading}
                width={200}
                height={200}
              />
              <p className="text-sm text-gray-500 mt-2">Large (200px)</p>
            </div>
          </div>
        </section>

        {/* 속도 조절 */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            3. 재생 속도 조절
          </h2>
          <div className="flex items-center justify-around gap-4">
            <div className="text-center">
              <LottieAnimation
                animationData={sampleLoading}
                width={100}
                height={100}
                speed={0.5}
              />
              <p className="text-sm text-gray-500 mt-2">0.5x 느리게</p>
            </div>
            <div className="text-center">
              <LottieAnimation
                animationData={sampleLoading}
                width={100}
                height={100}
                speed={1}
              />
              <p className="text-sm text-gray-500 mt-2">1x 보통</p>
            </div>
            <div className="text-center">
              <LottieAnimation
                animationData={sampleLoading}
                width={100}
                height={100}
                speed={2}
              />
              <p className="text-sm text-gray-500 mt-2">2x 빠르게</p>
            </div>
          </div>
        </section>

        {/* 사용 가이드 */}
        <section className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            💡 더 많은 애니메이션 사용하기
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <a
                href="https://lottiefiles.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LottieFiles
              </a>
              에서 원하는 애니메이션 검색
            </li>
            <li>JSON 파일 다운로드</li>
            <li>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                src/shared/assets/animations/
              </code>{' '}
              폴더에 저장
            </li>
            <li>컴포넌트에서 import하여 사용</li>
          </ol>
          <div className="mt-4 p-4 bg-white rounded border border-blue-200">
            <p className="text-sm font-mono text-gray-800">
              import myAnimation from '@/shared/assets/animations/my-animation.json';
              <br />
              <br />
              {'<LottieAnimation animationData={myAnimation} />'}
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            자세한 사용법은 <code className="bg-gray-200 px-2 py-1 rounded">LOTTIE_USAGE_GUIDE.md</code> 문서를 참고하세요.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LottieExample;
