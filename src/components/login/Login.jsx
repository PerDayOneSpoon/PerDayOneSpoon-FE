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
  margin-bottom: 50px;
  word-break: keep-all;
`;

const StLoginStart = styled.div`
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const StLoginText = styled(CommonText)`
  width: inherit;
  position: relative;

  padding: 12px 16px;
  border-radius: 22px;
  background-color: ${colors.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  ::before {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    /* transform: translateX(50%);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: ${colors.white};
    border-bottom: 0;
    margin-left: -20px;
    margin-bottom: -20px; */
    width: 16px;
    height: 16px;
    transform: rotate(45deg) translateX(-50%);
    background-color: ${colors.white};
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.07);
  }
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
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-bottom: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
