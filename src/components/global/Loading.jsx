import styled from 'styled-components';
import { colors } from '../../theme/theme';

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingAnimation></LoadingAnimation>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0);
`;

const LoadingAnimation = styled.div`
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  -webkit-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
  border-radius: 10px;
  // 255, 181, 95, 0.2
  -webkit-box-shadow: 25px 0px 0 0 rgba(255, 181, 95, 0.2),
    20.22542px 14.69463px 0 0 rgba(255, 181, 95, 0.4),
    7.72542px 23.77641px 0 0 rgba(255, 181, 95, 0.6),
    -7.72542px 23.77641px 0 0 rgba(255, 181, 95, 0.8),
    -20.22542px 14.69463px 0 0 white;
  box-shadow: 25px 0px 0 0 rgba(255, 181, 95, 0.2),
    20.22542px 14.69463px 0 0 rgba(255, 181, 95, 0.4),
    7.72542px 23.77641px 0 0 rgba(255, 181, 95, 0.6),
    -7.72542px 23.77641px 0 0 rgba(255, 181, 95, 0.8),
    -20.22542px 14.69463px 0 0 rgba(255, 181, 95, 0.9);
  height: 10px;
  width: 10px;
  display: block;
  content: '';
`;
