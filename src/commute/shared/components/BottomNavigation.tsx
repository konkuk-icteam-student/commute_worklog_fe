import { useNavigate } from 'react-router-dom';

// Navigation icons
import HomeButton from '../../../shared/assets/HomeButton.svg';
import SelectedHomeButton from '../../../shared/assets/SelectedHomeButton.svg';
import CalendarButton from '../../../shared/assets/CalendarButton.svg';
import SelectedCalendarButton from '../../../shared/assets/SelectedCalendarButton.svg';
import MessageButton from '../../../shared/assets/MessageButton.svg';
import SelectedMessageButton from '../../../shared/assets/SelectedMessageButton.svg';
import ProfileButton from '../../../shared/assets/ProfileButton.svg';
import SelectedProfileButton from '../../../shared/assets/SelectedProfileButton.svg';

type NavigationPage = 'home' | 'calendar' | 'message' | 'mypage';

interface BottomNavigationProps {
  activePage: NavigationPage;
}

export default function BottomNavigation({ activePage }: BottomNavigationProps) {
  const navigate = useNavigate();

  const handleNavigation = (page: NavigationPage) => {
    switch (page) {
      case 'home':
        navigate('/home');
        break;
      case 'calendar':
        navigate('/schedule');
        break;
      case 'message':
        // TODO: 메시지 페이지 구현 시 추가
        console.log('Message page - 준비 중');
        break;
      case 'mypage':
        navigate('/mypage');
        break;
    }
  };

  return (
    <div
      className="fixed bottom-[2rem] left-1/2 -translate-x-1/2 w-[90%] max-w-[39.3rem]"
      data-name="BottomNavigation"
    >
      <div className="bg-white rounded-[5rem] shadow-[0rem_0.4rem_3rem_0rem_rgba(81,168,255,0.2)] px-[3.2rem] py-[1.6rem]">
        <div className="flex items-center justify-between gap-[2rem]">
          {/* Home Button */}
          <button
            onClick={() => handleNavigation('home')}
            className={`flex items-center justify-center rounded-full size-[4rem] transition-all ${
              activePage === 'home' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'home' ? SelectedHomeButton : HomeButton}
              alt="Home"
              className="w-[2.4rem] h-[2.4rem]"
            />
          </button>

          {/* Calendar Button */}
          <button
            onClick={() => handleNavigation('calendar')}
            className={`flex items-center justify-center rounded-full size-[4rem] transition-all ${
              activePage === 'calendar' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'calendar' ? SelectedCalendarButton : CalendarButton}
              alt="Calendar"
              className="w-[2.4rem] h-[2.4rem]"
            />
          </button>

          {/* Message Button */}
          <button
            onClick={() => handleNavigation('message')}
            className={`flex items-center justify-center rounded-full size-[4rem] transition-all ${
              activePage === 'message' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'message' ? SelectedMessageButton : MessageButton}
              alt="Message"
              className="w-[2.4rem] h-[2.4rem]"
            />
          </button>

          {/* Profile Button */}
          <button
            onClick={() => handleNavigation('mypage')}
            className={`flex items-center justify-center rounded-full size-[4rem] transition-all ${
              activePage === 'mypage' ? 'bg-[rgba(81,168,255,0.1)]' : 'hover:bg-gray-50'
            }`}
            data-name="Button"
          >
            <img
              src={activePage === 'mypage' ? SelectedProfileButton : ProfileButton}
              alt="Profile"
              className="w-[2.4rem] h-[2.4rem]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
