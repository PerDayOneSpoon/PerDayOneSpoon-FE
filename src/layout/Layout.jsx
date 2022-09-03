import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../constants/common';

const Layout = ({ children, hasNavBar }) => {
  return <Container hasNavBar={hasNavBar}>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 390px;
  /* width: 100%; */
  min-height: ${({ hasNavBar }) =>
    hasNavBar ? `calc(100vh - ${NAV_BAR_HEIGHT}px)` : '100vh'};
  padding: 0 16px
    ${({ hasNavBar }) => (hasNavBar ? `${NAV_BAR_HEIGHT}px` : '0')};
  overflow: hidden;
  border: 1px solid red;
  margin: 0 auto;
  word-break: break-all;
`;
