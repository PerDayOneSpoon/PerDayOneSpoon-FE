import styled from 'styled-components';
import NavBar from '../components/global/NavBar';
import { isMobile } from 'react-device-detect';
import { colors } from '../theme/theme';

const Layout = ({ children, hasNavBar = true, bgColor = colors.gray50 }) => {
  return (
    <Background bgColor={bgColor}>
      <BodyContent isMobile={isMobile}>{children}</BodyContent>
      {hasNavBar && <NavBar />}
    </Background>
  );
};

export default Layout;

const Background = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${({ bgColor }) => bgColor};
  box-sizing: border-box;
`;

const BodyContent = styled.div`
  height: ${({ hasNavBar }) => (hasNavBar ? 'calc(100% - 60px)' : '100%')};
  overflow: hidden auto;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;
