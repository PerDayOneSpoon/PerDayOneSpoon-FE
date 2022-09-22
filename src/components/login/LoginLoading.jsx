import styled from 'styled-components';
import { colors } from '../../theme/theme';
import characterImg from '../../assets/imgs/login-character1.png';
import CommonText from '../elements/CommonText';

const LoginLoading = () => {
  return (
    <Container>
      <div>
        <ImgContainer>
          <CharacterImg src={characterImg} />
        </ImgContainer>
        <CustomText isTitle2={true}>
          <PointText>하루 한 줌</PointText>과 건강한 습관 만들기
        </CustomText>
      </div>
    </Container>
  );
};

export default LoginLoading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${colors.orange100};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -12vh;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  background: linear-gradient(180deg, #ffb55f 0%, #ff9f2e 100%);
  box-shadow: 0px 4px 16px rgba(255, 181, 95, 0.46);
  border-radius: 50px;
`;
const CharacterImg = styled.img``;

const CustomText = styled(CommonText)`
  width: 220px;
  word-break: keep-all;
  text-align: center;
  letter-spacing: 2px;
  line-height: 28px;
  font-weight: 600;
  margin-top: 40px;
`;

const PointText = styled.span`
  color: ${colors.orange500};
  font-weight: bold;
`;
