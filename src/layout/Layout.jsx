import styled from 'styled-components';

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 390px;
  width: 100%;
  padding: 0 16px;
  overflow: hidden;
  border: 1px solid red;
  margin: 0 auto;
  word-break: break-all;
`;
