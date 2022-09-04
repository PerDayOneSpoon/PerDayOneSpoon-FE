import { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyles from './GlobalStyle';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  return (
    <RecoilRoot>
      <GlobalStyles />
      <Router />
    </RecoilRoot>
  );
}

export default App;
