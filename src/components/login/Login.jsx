import styled from 'styled-components';
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../constants/common';
import char1 from '../../assets/imgs/character1.png';
import loginImg from '../../assets/imgs/login.png';
import loginKakao from '../../assets/imgs/login-kakao.png';
import loginNaver from '../../assets/imgs/login-naver.png';
import loginGoogle from '../../assets/imgs/login-google.png';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const Login = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
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
      <StMainTextBox>
        <CommonText fc={colors.primary} fw='500' fz='18px' lh='24px' wd='180px'>
          지금 하루 한 줌과 습관을 만들어 보아요!
        </CommonText>

        <CommonText isCaption={true} fc={colors.text} mg='8px 0 0 0'>
          빠른 습관 설정과 달성까지
        </CommonText>
      </StMainTextBox>

      <StLoginStart>
        <LoginImg src={loginImg} alt='로그인 이미지' />
        <StLoginText isCaption={true}>3초만에 시작하기</StLoginText>
      </StLoginStart>

      <StLoginButtonBox>
        <StLoginButton>
          <ImgContainer onClick={handleKakaoLogin}>
            <ButtonImg src={loginKakao} alt='카카오로그인' />
          </ImgContainer>

          <CommonText isCaption={true}>
            카카오로
            <br />
            시작하기
          </CommonText>
        </StLoginButton>

        <StLoginButton>
          <ImgContainer onClick={handleNaverLogin}>
            <ButtonImg src={loginNaver} alt='네이버로그인' />
          </ImgContainer>
          <CommonText isCaption={true}>
            네이버로
            <br />
            시작하기
          </CommonText>
        </StLoginButton>

        <StLoginButton>
          <ImgContainer onClick={handleGoogleLogin}>
            <ButtonImg src={loginGoogle} alt='구글로그인' />
          </ImgContainer>
          <CommonText isCaption={true}>
            구글로
            <br />
            시작하기
          </CommonText>
        </StLoginButton>
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

const StMainTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 104px;
  word-break: keep-all;
`;

const StLoginStart = styled.div`
  position: relative;
  height: 80px;
`;

const LoginImg = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const StLoginText = styled(CommonText)`
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const StLoginButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  & + & {
    margin-left: 24px;
  }
`;

const ImgContainer = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-color: ${colors.inputColor};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonImg = styled.img``;
