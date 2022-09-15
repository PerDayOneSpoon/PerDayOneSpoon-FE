import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const Achievement = ({ title, num, totalNum, isBadge }) => {
  return (
    <Container>
      <CommonText fc={colors.text}>{title}</CommonText>

      {isBadge ? (
        <CommonText isH6={true} fc={colors.primary} mg='8px 0 0 0'>
          {num}/{totalNum}
        </CommonText>
      ) : (
        <CommonText isH6={true} fc={colors.primary} mg='8px 0 0 0'>
          {num}
        </CommonText>
      )}
    </Container>
  );
};

export default Achievement;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  padding: 20px 0;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  & + & {
    margin-left: 16px;
  }
`;
