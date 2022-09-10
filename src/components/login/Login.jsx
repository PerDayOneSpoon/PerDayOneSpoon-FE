import styled from 'styled-components';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from '../../constants/common';
import char1 from '../../assets/imgs/character1.png';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const Login = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      <StTop />
      <StMainLogoBox>
        <StMainDiv>
          <ChracterContainer>
            <Character src={char1} />
          </ChracterContainer>
        </StMainDiv>
      </StMainLogoBox>
      <StMainText>
        <h6>
          지금 하루 한 줌과 <br />
          목표를 달성해 보아요!
        </h6>
      </StMainText>
      <StSubText>
        <div>빠른 목표 설정과 목표 달성까지</div>
      </StSubText>

      <StLoginStart>
        <CommonText isCaption={true}>3초만에 시작하기</CommonText>
      </StLoginStart>

      <StLoginButtonBox>
        <div>
          <StLoginButton onClick={handleKakaoLogin} />
          <CommonText isCaption={true}>
            카카오로
            <br />
            시작하기
          </CommonText>
        </div>

        <div>
          <StLoginButton onClick={handleGoogleLogin} />
          <CommonText isCaption={true}>
            구글로
            <br />
            시작하기
          </CommonText>
        </div>

        <div>
          <StLoginButton />
          <CommonText isCaption={true}>
            네이버로
            <br />
            시작하기
          </CommonText>
        </div>
      </StLoginButtonBox>
    </>
  );
};

export default Login;

const StTop = styled.div`
  height: 44px;
`;

const StMainLogoBox = styled.div`
  width: 100%;
  padding-top: 73px;
  display: flex;
  justify-content: center;
`;

const StMainDiv = styled.div`
  width: 136px;
  height: 136px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${colors.primary};
`;

const ChracterContainer = styled.div`
  width: 88px;
  height: 82px;
  border-radius: 50%;
`;

const Character = styled.img`
  width: 100%;
  object-fit: cover;
`;

const StMainText = styled.div`
  padding-top: 23px;
  padding-bottom: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const StSubText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.4px;
  padding-bottom: 104px;
`;

const StLoginStart = styled.div`
  display: flex;
  justify-content: center;
  height: 51px;
`;

const StLoginButtonBox = styled.div`
  width: 252px;
  margin-left: 69px;
  padding-top: 29px;
  padding-bottom: 136px;
  display: flex;
  justify-content: space-between;
`;

const StLoginButton = styled.div`
  width: 68px;
  height: 68px;
  background-color: #eee;
  border-radius: 50%;
`;

const StLoginText = styled.div`
  font-weight: 400;
  font-size: 12px;
`;
