import { useNavigate } from 'react-router-dom';
import ManagerQR from '../../imports/ManagerQR';
import svgPaths from '../../imports/svg-t1qecyan8p';

type ButtonProps = {
  active: boolean;
  onClick: () => void;
};

function Icon2({ active }: { active: boolean }) {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99746 10.9965">
            <path d={svgPaths.p27b3c860} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 20.9938">
            <path d={svgPaths.p27cb6000} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button({ active, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute content-stretch flex flex-col items-start left-0 pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0 ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon2 active={active} />
    </button>
  );
}

function Icon3({ active }: { active: boolean }) {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99936 5.9981">
            <path d="M0.999682 0.999682V4.99841" id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99936 5.9981">
            <path d="M0.999682 0.999682V4.99841" id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 19.9937">
            <path d={svgPaths.p260a3f80} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 1.99936">
            <path d="M0.999682 0.999682H18.994" id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute content-stretch flex flex-col items-start left-[87.97px] pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0 ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon3 active={active} />
    </div>
  );
}

function Icon4({ active }: { active: boolean }) {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%_8.35%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.993 20.9892">
            <path d={svgPaths.p3a853f00} id="Vector" stroke={active ? '#51A8FF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2({ active, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute content-stretch flex flex-col items-start left-[175.94px] pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0 ${active ? 'bg-[rgba(81,168,255,0.1)]' : ''}`}
      data-name="Button"
    >
      <Icon4 active={active} />
    </button>
  );
}

function Icon5() {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9949 7.99746">
            <path d={svgPaths.p39f3b4d0} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99683 9.99683">
            <path d={svgPaths.p370c1e00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99936" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[263.91px] pb-0 pt-[7.992px] px-[7.992px] rounded-[18715300px] size-[39.976px] top-0" data-name="Button">
      <Icon5 />
    </div>
  );
}

type BottomNavProps = {
  onNavigate: (page: 'home' | 'qr' | 'task') => void;
  currentPage: 'home' | 'qr' | 'task';
};

function BottomNavigation({ onNavigate, currentPage }: BottomNavProps) {
  return (
    <div className="fixed bg-white content-stretch flex flex-col h-[71.96px] items-start left-1/2 pb-0 pt-[15.992px] px-[31.993px] rounded-[18715300px] shadow-[0px_4px_30px_0px_rgba(81,168,255,0.2)] bottom-[20px] translate-x-[-50%] w-[367.869px] z-50" data-name="DesktopHome">
      <div className="h-[39.976px] relative shrink-0 w-full" data-name="Container">
        <Button active={currentPage === 'home'} onClick={() => onNavigate('home')} />
        <Button1 active={currentPage === 'qr'} />
        <Button2 active={currentPage === 'task'} onClick={() => onNavigate('task')} />
        <Button3 />
      </div>
    </div>
  );
}

export default function ManagerQRPage() {
  const navigate = useNavigate();

  const handleNavigate = (page: 'home' | 'qr' | 'task') => {
    switch (page) {
      case 'home':
        navigate('/manager/home');
        break;
      case 'qr':
        navigate('/manager/qr');
        break;
      case 'task':
        navigate('/manager/task');
        break;
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-white">
      <div className="w-full max-w-[1920px] relative">
        <ManagerQR />
        <BottomNavigation onNavigate={handleNavigate} currentPage="qr" />
      </div>
    </div>
  );
}
