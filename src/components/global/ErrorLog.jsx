import styled from 'styled-components';
import { colors } from '../../theme/theme';

const ErrorLog = ({ error }) => {
  return (
    <ErrorContainer>
      <InfoText>
        오류가 발생했습니다. <br />
        관리자에게 문의해주세요.
      </InfoText>
      <div>{error.message}</div>
    </ErrorContainer>
  );
};

export default ErrorLog;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: ${colors.white};
`;

const InfoText = styled.h2`
  color: ${colors.danger};
  font-size: 26px;
  line-height: 32px;
  margin-bottom: 24px;
`;
