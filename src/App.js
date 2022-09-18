import { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyles from './GlobalStyle';
import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { colors } from './theme/theme';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  return (
    <ResponsiveContainer>
      <img src='' alt='백그라운드 이미지' />

      <div>
        <GlobalStyles />
        <Router />
      </div>
    </ResponsiveContainer>
  );
}

export default App;

const ResponsiveContainer = styled.div`
  width: 100%;
  height: 100%;

  & > img {
    display: none;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: ${(props) => props.theme.mainColor};
  }

  @media (min-width: 1025px) {
    background-color: ${colors.wallPaper};
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      display: block;
      width: 32.5rem;
      height: 32.5rem;
      margin-right: 5rem;
    }

    & > div {
      width: 32rem;
      box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
    }
  }
`;
