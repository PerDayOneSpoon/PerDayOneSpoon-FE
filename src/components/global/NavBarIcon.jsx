import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const NavBarIcon = ({ icon, label, handleNavIconClick, isActive }) => {
  return (
    <Container onClick={handleNavIconClick}>
      <IconContainer isActive={isActive}>{icon}</IconContainer>
      <CommonText isCaption={true} fc={colors.text}>
        <Label isActive={isActive}>{label}</Label>
      </CommonText>
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

const Label = styled.span`
  color: ${({ isActive }) => isActive && colors.primary};
`;
