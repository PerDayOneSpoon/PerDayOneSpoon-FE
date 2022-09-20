import { colors } from '../../theme/theme';
import styled from 'styled-components';
import CommonText from '../elements/CommonText';

const ToastModal = ({ toastMessage, displayNone }) => {
  return (
    <Container displayNone={displayNone}>
      <CustomText isCallout={true} fc={colors.white}>
        {toastMessage}
      </CustomText>
    </Container>
  );
};

export default ToastModal;

const Container = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);

  max-height: 40px;
  width: 80%;
  text-align: center;
  opacity: ${({ displayNone }) => (displayNone ? 0 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;
`;

const CustomText = styled(CommonText)`
  width: fit-content;
  border-radius: 30px;
  padding: 8px 20px;
  font-weight: 400;
  background-color: ${colors.danger};
  color: ${colors.white};
  word-break: break-all;
  margin: 0;
`;
