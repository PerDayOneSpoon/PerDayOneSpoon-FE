import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../constants/common';

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 390px;
  width: 100%;
  min-height: 100vh;
  padding: 0 16px ${NAV_BAR_HEIGHT}px;
  overflow: hidden;
  border: 1px solid red;
  margin: 0 auto;
  word-break: break-all;
`;
