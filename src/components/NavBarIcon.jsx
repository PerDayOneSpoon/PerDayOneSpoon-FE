import styled from 'styled-components';

const NavBarIcon = ({ imgSrc, label }) => {
  return (
    <Container>
      <IconContainer>
        <NavIcon src={imgSrc} />
      </IconContainer>
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
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
`;
const NavIcon = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Label = styled.div``;
