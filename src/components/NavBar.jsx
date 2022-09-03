import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../constants/common';
import NavBarIcon from './NavBarIcon';

const NavBar = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg',
      label: '홈',
    },
    {
      id: 2,
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg',
      label: '달성',
    },
    {
      id: 3,
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg',
      label: '친구',
    },
    {
      id: 4,
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg',
      label: '마이페이지',
    },
  ];

  const handleNavIconClick = (val) => {
    if (val === '홈') {
      navigate('/');
    }
    if (val === '마이페이지') {
      navigate('/mypage');
    }
    if (val === '친구') {
      navigate('/friends');
    }

    console.log(val);
  };

  return (
    <NavContainer>
      {data.map((item) => (
        <NavBarIcon
          key={item.id}
          label={item.label}
          imgSrc={item.imgSrc}
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
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: inherit;
  padding: 0 16px;
  height: ${NAV_BAR_HEIGHT}px;
  background-color: #eee;
`;
