import { useEffect, Suspense } from 'react';
import Router from './shared/Router';
import GlobalStyles from './GlobalStyle';
import styled from 'styled-components';
import { colors } from './theme/theme';
import backgroundImg from './assets/imgs/background.png';
import RouteChangeTracker from './shared/RouteChangeTracker';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorLog from './components/global/ErrorLog';
import Loading from './components/global/Loading';

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
        <RouteChangeTracker />
        <GlobalStyles />

        <ErrorBoundary FallbackComponent={ErrorLog}>
          <Suspense fallback={<Loading />}>
            <Router />
          </Suspense>
        </ErrorBoundary>
      </Contents>
    </ResponsiveContainer>
  );
}

export default App;

const ResponsiveContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

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
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${(props) => props.theme.mainColor};
  position: relative;
  z-index: 2;

  @media (min-width: 1025px) {
    width: 32rem;
    height: 100vh;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImgContainer = styled.div`
  display: none;
  /* width: 897px; */
  /* height: 582px; */

  @media (min-width: 1025px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    width: calc(100% - 50rem);
    height: 100vh;
    overflow: hidden;
  }
`;

const ImgContainerInner = styled.div`
  width: 50vw;

  @media (min-width: 1025px) {
    & > img {
      width: 100%;
      height: 100%;
      margin-left: 4rem;
    }
  }
`;

const TextBox = styled.div`
  width: 90%;
  font-size: 2.5vw;
  line-height: 3vw;
  letter-spacing: 1px;
  font-weight: 700;
  text-align: center;
  padding-top: 16vh;
  box-sizing: border-box;

  > span {
    color: ${colors.orange500};
  }
`;
