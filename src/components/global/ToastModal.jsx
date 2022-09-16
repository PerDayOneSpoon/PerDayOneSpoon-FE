import { colors } from '../../theme/theme';
import styled from 'styled-components';
import CommonText from '../elements/CommonText';

const ToastModal = ({ toastMessage, displayNone }) => {
  return (
    <Container displayNone={displayNone}>
      <CommonText isSubtitle2={true} fc={colors.white} pd='8px 24px'>
        {toastMessage}
      </CommonText>
    </Container>
  );
};

export default ToastModal;

const Container = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 30px;
  max-width: 240px;
  width: 100%;
  text-align: center;

  color: ${colors.white};
  background-color: ${colors.danger};
  display: ${({ displayNone }) => (displayNone ? 'none' : 'block')};
`;
