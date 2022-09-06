import { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyles from './GlobalStyle';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
