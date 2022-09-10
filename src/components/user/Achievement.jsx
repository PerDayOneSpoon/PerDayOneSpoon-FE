import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const Achievement = ({ title, num, totalNum, isBadge }) => {
  return (
    <Container>
      <CommonText fc={colors.text}>{title}</CommonText>

      {isBadge ? (
        <GetAchievement>
          {num}/{totalNum}
        </GetAchievement>
      ) : (
        <GetAchievement>{num}</GetAchievement>
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

const GetAchievement = styled.div`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.15px;
  font-weight: 500;
  color: ${colors.primary};
  margin-top: 8px;
`;
