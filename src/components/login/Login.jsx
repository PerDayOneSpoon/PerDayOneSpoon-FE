import styled, { css } from 'styled-components';
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../constants/common';
import char1 from '../../assets/imgs/character1.png';
import { ReactComponent as IconGoogle } from '../../assets/icons/icon-google.svg';
import { ReactComponent as IconKakao } from '../../assets/icons/icon-kakao.svg';
import { ReactComponent as IconNaver } from '../../assets/icons/icon-naver.svg';
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
      <StMainLogoBox>
        <StMainDiv>
          <ChracterContainer>
            <Character src={char1} />
          </ChracterContainer>
        </StMainDiv>
      </StMainLogoBox>
      <StMainTextBox>
        <CommonText
          fc={colors.primary}
          isTitle2={true}
          isBold={true}
          wd='190px'
        >
          지금 하루 한 줌과 습관을 만들어 보아요!
        </CommonText>

        <CommonText isCaption={true} fc={colors.gray700} mg='16px 0 0 0'>
          빠른 습관 설정과 달성까지
        </CommonText>
      </StMainTextBox>

      <StLoginStart>
        <StLoginText isFootnote1={true} fc={colors.textBlack}>
          ⏱ 3초만에 시작하기
        </StLoginText>
      </StLoginStart>

      <StLoginButtonBox>
        <StLoginButton bgColor='kakao' onClick={handleKakaoLogin}>
          <IconContainer>
            <IconKakao />
          </IconContainer>
          <CommonText wd='162px' isSubhead={true} fz='15px'>
            카카오톡 계정으로 로그인
          </CommonText>
        </StLoginButton>

        <StLoginButton bgColor='naver' onClick={handleNaverLogin}>
          <IconContainer>
            <IconNaver />
          </IconContainer>
          <CommonText wd='162px' isSubhead={true} fz='15px'>
            네이버 계정으로 로그인
          </CommonText>
        </StLoginButton>

        <StLoginButton bgColor='google' onClick={handleGoogleLogin}>
          <IconContainer>
            <IconGoogle />
          </IconContainer>
          <CommonText wd='162px' isSubhead={true} fz='15px'>
            구글 계정으로 로그인
          </CommonText>
        </StLoginButton>
      </StLoginButtonBox>
    </>
  );
};

export default Login;

const StMainLogoBox = styled.div`
  width: 100%;
  padding-top: 80px;
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
  flex-direction: column;
  align-items: center;
`;

const StLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 60px;
  padding: 14px 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  ${({ bgColor }) => {
    switch (bgColor) {
      case 'kakao':
        return css`
          background-color: #f9e001;
        `;
      case 'naver':
        return css`
          background-color: #03c75a;
        `;
      case 'google':
        return css`
          background-color: #ffffff;
        `;
      default:
        return css`
          background-color: ${colors.white};
        `;
    }
  }}

  & + & {
    margin-top: 16px;
  }
`;

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
