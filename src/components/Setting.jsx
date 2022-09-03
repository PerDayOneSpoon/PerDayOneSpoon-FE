import styled from 'styled-components';

const Setting = () => {
  return (
    <>
      <StTop />
      <StSettingTop>
        <p>계정</p>
        <button>저장</button>
      </StSettingTop>
      <StPictureBox>
        <StPicture />
      </StPictureBox>
      <StProfileText>프로필 사진 바꾸기</StProfileText>
      <St1 />
      <St2 />
    </>
  );
};

export default Setting;

const StTop = styled.div`
  height: 44px;
`;

const StSettingTop = styled.div`
  background-color: #f28787;
  display: flex;
`;

const StPictureBox = styled.div`
  background-color: pink;
  display: flex;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 15px;
`;

const StPicture = styled.div`
  width: 96px;
  height: 96px;
  background-color: #eee;
  border-radius: 50px;
`;

const StProfileText = styled.div`
  background-color: #dbdbfc;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: center;
`;

const St1 = styled.div`
  background-color: #fbfba1;
  height: 224px;
`;

const St2 = styled.div`
  background-color: #b7e3f4;
  height: 348px; ;
`;
