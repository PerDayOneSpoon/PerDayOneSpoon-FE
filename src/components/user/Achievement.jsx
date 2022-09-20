import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const Achievement = ({ title, num, totalNum, isBadge, handleAchiveClick }) => {
  return (
    <Container onClick={handleAchiveClick}>
      <CommonText isSentece3={true} fc={colors.gray600} mg='0 0 8px 0'>
        {title}
      </CommonText>

      {isBadge ? (
        <CommonText isBody={true} isBold={true} fc={colors.primary}>
          {num}/{totalNum}
        </CommonText>
      ) : (
        <CommonText isBody={true} isBold={true} fc={colors.primary}>
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
  padding: 16px 0;
  background-color: ${colors.white};
  border-radius: 10px;
  border: 1px solid ${colors.gray200};

  & + & {
    margin-left: 16px;
  }
`;
