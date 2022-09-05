import styled from 'styled-components';

const NavBarIcon = ({ icon, label, handleNavIconClick }) => {
  return (
    <Container onClick={handleNavIconClick}>
      <IconContainer>{icon}</IconContainer>
      <Label>{label}</Label>
    </Container>
  );
};

export default NavBarIcon;

const Container = styled.div`
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;

const IconContainer = styled.div`
  margin-bottom: 2px;
`;

const Label = styled.div`
  font-size: 14px;
`;
