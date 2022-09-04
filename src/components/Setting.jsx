import styled from 'styled-components';
import { ReactComponent as IconAddCharacter } from '../assets/icons/icon-add-character.svg';

const Setting = () => {
  return (
    <Container>
      <Top>
        <IconContainer>
          <IconAddCharacter />
        </IconContainer>
        <ChangingText>프로필사진바꾸기</ChangingText>
      </Top>
      <Hr></Hr>

      <SettingForm>
        <FormLeft>이름</FormLeft>
        <FormRight>이름</FormRight>
      </SettingForm>
      <SettingForm>
        <FormLeft>상태 메세지</FormLeft>
        <FormRight>상태 메세지</FormRight>
      </SettingForm>
    </Container>
  );
};

export default Setting;

const Container = styled.div``;

const Top = styled.div`
  height: 172px;
  padding: 16px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
`;

const ChangingText = styled.div`
  width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  background-color: transparent;
  text-align: center;
`;

const Hr = styled.hr`
  width: 100%;
`;

const SettingForm = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 32px;
  }
`;

const FormLeft = styled.div`
  width: 90px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;
const FormRight = styled.div`
  margin-left: 16px;
  opacity: 0.3;
  border-bottom: 1px solid black;
`;
