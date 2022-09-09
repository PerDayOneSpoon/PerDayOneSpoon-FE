import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { NAV_BAR_HEIGHT } from '../../constants/common';
import NavBarIcon from './NavBarIcon';
import { ReactComponent as IconHome } from '../../assets/icons/icon-home.svg';
import { ReactComponent as IconMypage } from '../../assets/icons/icon-mypage.svg';
import { ReactComponent as IconBadge } from '../../assets/icons/icon-badge.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { colors } from '../../theme/theme';
import { useState } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

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

    console.log(val);
  };

  return (
    <NavContainer>
      {data.map((item) => (
        <NavBarIcon
          key={item.id}
          label={item.label}
          icon={item.icon}
          isActive={active}
          handleNavIconClick={() => handleNavIconClick(item.label)}
        />
      ))}
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 9;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: inherit;
  padding: 0 16px;
  height: ${NAV_BAR_HEIGHT}px;
  background-color: ${colors.white};
  filter: drop-shadow(0px -1px 20px rgba(0, 0, 0, 0.07));
`;
