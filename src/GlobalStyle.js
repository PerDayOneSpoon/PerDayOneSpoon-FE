import { createGlobalStyle } from 'styled-components';
import { isMobile } from 'react-device-detect';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`   
  ${reset} 
  :root {
       --vh: 100%;
   }
   * {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
   }
   
   body {
    width: 100%;        
    height: calc(var(--vh, 1vh) * 100);
    overflow-y: scroll;    
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }  

    @media (min-width: 1025px) {
      height: 100vh;
    }
  
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }

  @supports (-webkit-appearance:none) and (stroke-color: transparent) {
  min-height: -webkit-fill-available;
}
  }

  /* input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  } */

`;

export default GlobalStyles;
