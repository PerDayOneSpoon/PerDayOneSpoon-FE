import styled, { css } from 'styled-components';
import { NAV_BAR_HEIGHT } from '../constants/common';
import { isMobile } from 'react-device-detect';
import { colors } from '../theme/theme';

const Layout = ({ children, hasNavBar }) => {
  return (
    <Container hasNavBar={hasNavBar} isMobile={isMobile}>
      {children}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: ${colors.bgColor};
  max-width: 390px;
  /* width: 100%; */
  ${({ isMobile }) =>
    isMobile
      ? css`
          min-height: calc(var(--vh, 1vh) * 100);
        `
      : css`
          min-height: ${({ hasNavBar }) =>
            hasNavBar ? `calc(100vh - ${NAV_BAR_HEIGHT}px)` : '100vh'};
        `}

  padding: 0 16px
    ${({ hasNavBar }) => (hasNavBar ? `${NAV_BAR_HEIGHT}px` : '0')};
  overflow: hidden;
  margin: 0 auto;
  word-break: break-all;
`;
