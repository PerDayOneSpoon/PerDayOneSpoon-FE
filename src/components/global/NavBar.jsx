import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { NAV_BAR_HEIGHT } from '../../constants/common';
import NavBarIcon from './NavBarIcon';
import { ReactComponent as IconHome } from '../../assets/icons/icon-home.svg';
import { ReactComponent as IconMypage } from '../../assets/icons/icon-mypage.svg';
import { ReactComponent as IconBadge } from '../../assets/icons/icon-badge.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { colors } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { navBarState } from '../../recoil/common';

const NavBar = () => {
  const navigate = useNavigate();
  const [classActive, setClassActive] = useRecoilState(navBarState);

  const data = [
    {
      id: 1,
      icon: <IconHome />,
      label: '홈',
    },
    {
      id: 2,
      icon: <IconCalendar />,
      label: '캘린더',
    },
    {
      id: 3,
      icon: <IconBadge />,
      label: '뱃지',
    },
    {
      id: 4,
      icon: <IconMypage />,
      label: '마이페이지',
    },
  ];

  const handleNavIconClick = (val) => {
    setClassActive(val);

    switch (val) {
      case '홈':
        navigate('/');
        break;
      case '캘린더':
        navigate('/calendar');
        break;
      case '뱃지':
        navigate('/collection');
        break;
      case '마이페이지':
        navigate('/mypage');
        break;
      default:
        return;
    }
  };

  return (
    <NavContainer>
      {data.map((item, i) => (
        <NavBarIcon
          key={item.id}
          label={item.label}
          icon={item.icon}
          className={classActive}
          handleNavIconClick={() => {
            handleNavIconClick(item.label);
          }}
        />
      ))}
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: ${NAV_BAR_HEIGHT}px;
  background-color: ${colors.white};
  box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.07);
`;
