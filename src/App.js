import { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyles from './GlobalStyle';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { colors } from './theme/theme';
import backgroundImg from './assets/imgs/background.png';
import CommonText from './components/elements/CommonText';

function App() {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => window.removeEventListener('resize', setScreenSize);
  });

  return (
    <ResponsiveContainer>
      <ImgContainer>
        <TextBox>
          <span>하루 한 줌</span>과 함께 <br />
          습관 만들기
        </TextBox>
        <ImgContainerInner>
          <img src={backgroundImg} alt='백그라운드 이미지' />
        </ImgContainerInner>
      </ImgContainer>

      <Contents>
        <GlobalStyles />
        <Router />
      </Contents>
    </ResponsiveContainer>
  );
}

export default App;

const ResponsiveContainer = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 1025px) {
    background-color: ${colors.wallPaper};
    display: flex;
    align-items: center;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
  position: relative;
  z-index: 2;

  @media (min-width: 1025px) {
    width: 32rem;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImgContainer = styled.div`
  position: relative;
  display: none;
  width: 897px;
  height: 100vh;

  @media (min-width: 1025px) {
    display: block;
  }
`;

const ImgContainerInner = styled.div`
  width: 897px;
  height: 582px;
  position: absolute;
  right: -6rem;
  bottom: 4px;
  z-index: 1;

  @media (min-width: 1025px) {
    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  font-weight: 700;
  text-align: center;
  position: relative;
  padding-top: 18vh;
  padding-left: 10rem;
  box-sizing: border-box;

  > span {
    color: ${colors.orange500};
  }
`;
