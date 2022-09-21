import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const NavBarIcon = ({ icon, label, handleNavIconClick, className }) => {
  return (
    <Container onClick={handleNavIconClick}>
      <IconContainer className={className === label && 'active'}>
        {icon}
      </IconContainer>
      <CommonText isFootnote2={true} fc={colors.gray300}>
        <Label className={className === label && 'active'}>{label}</Label>
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
  color: ${colors.gray300};

  &.active {
    color: ${colors.orange500};
  }
`;

const Label = styled.span`
  color: ${colors.text};

  &.active {
    color: ${colors.primary};
  }
`;
