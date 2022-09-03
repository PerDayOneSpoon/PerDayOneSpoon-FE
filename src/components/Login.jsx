import styled from 'styled-components';

const Login = () => {
  return (
    <>
      <StTop />
      <StMainLogoBox>
        <StMainDiv />
      </StMainLogoBox>
      <StMainText>
        <div>
          지금 하루 한 줌과 <br />
          목표를 달성해 보아요!
        </div>
      </StMainText>
      <StSubText>
        <div>빠른 목표 설정과 목표 달성까지</div>
      </StSubText>

      <StLoginStart>
        <div>3초만에 시작하기</div>
      </StLoginStart>

      <StLoginButtonBox>
        <div>
          <StLoginButton />
          <StLoginText>
            카카오로
            <br />
            시작하기
          </StLoginText>
        </div>

        <div>
          <StLoginButton />
          <StLoginText>
            구글로<br></br>시작하기
          </StLoginText>
        </div>

        <div>
          <StLoginButton />
          <StLoginText>
            네이버로<br></br>시작하기
          </StLoginText>
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
  background-color: #88d488;
  width: 100%;
  padding-top: 73px;
  display: flex;
  justify-content: center;
`;

const StMainDiv = styled.div`
  width: 171px;
  height: 200px;
  background-color: #eee;
`;

const StMainText = styled.div`
  background-color: pink;
  padding-top: 23px;
  padding-bottom: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const StSubText = styled.div`
  background-color: #fdd371;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.4px;
  padding-bottom: 104px;
`;

const StLoginStart = styled.div`
  background-color: yellow;
  display: flex;
  justify-content: center;
  height: 51px;
`;

const StLoginButtonBox = styled.div`
  background-color: skyblue;
  width: 100%;
  padding-top: 29px;
  padding-bottom: 136px;
  display: flex;
  justify-content: center;
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
