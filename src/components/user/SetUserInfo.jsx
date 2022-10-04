import styled from 'styled-components';
import { colors } from '../../theme/theme';
import { ReactComponent as IconCamera } from '../../assets/icons/icon-camera.svg';
import { ReactComponent as IconCopy } from '../../assets/icons/icon-copy.svg';
import CommonText from '../elements/CommonText';
import Modal from '../global/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/common';

const SetUserInfo = ({
  onlyView,
  userInfo,
  editUserInfo,
  previewImg,
  handleInputChange,
  handleChangeImg,
}) => {
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <Container>
      <Top>
        <ProfileImgContainer>
          {onlyView ? (
            <ProfileImgContainerInner>
              <ProfileImg src={userInfo.data.profileImage} />
            </ProfileImgContainerInner>
          ) : (
            <>
              <ProfileImgContainerInner>
                <ProfileImg
                  src={
                    previewImg === '' ? userInfo.data.profileImage : previewImg
                  }
                />
              </ProfileImgContainerInner>
              <IconContainer htmlFor='profile-img'>
                <IconCamera />
                <input
                  type='file'
                  accept='image/jpeg,image/jpg,image/png'
                  id='profile-img'
                  onChange={handleChangeImg}
                />
              </IconContainer>
            </>
          )}
        </ProfileImgContainer>
        <CommonText isCallout={true} mg='0 0 8px 0'>
          {userInfo.data.nickname}
        </CommonText>
        <CommonText isFootnote2={true}>{userInfo.data.status}</CommonText>
      </Top>
      <Middle>
        <SettingForm>
          <CommonText isSentece3={true}>이름</CommonText>
          {onlyView ? (
            <FormInput>{userInfo.data.nickname}</FormInput>
          ) : (
            <InputRight
              type='text'
              value={editUserInfo.nickname || ''}
              name='nickname'
              onChange={handleInputChange}
            />
          )}
        </SettingForm>
        <SettingForm>
          <CommonText isSentece3={true}>상태 메세지</CommonText>
          {onlyView ? (
            <FormInput>{userInfo.data.status}</FormInput>
          ) : (
            <InputRight
              type='text'
              value={editUserInfo.status || ''}
              name='status'
              onChange={handleInputChange}
            />
          )}
        </SettingForm>
        <SettingForm>
          <CommonText isSentece3={true}>검색 코드</CommonText>
          <FormInput>
            {userInfo.data.socialCode}
            <IconCopyContainer
              onClick={() => {
                navigator.clipboard.writeText(userInfo.data.socialCode);
                setModal({ open: true, type: 'alert' });
              }}
            >
              <IconCopy />
            </IconCopyContainer>
          </FormInput>
        </SettingForm>
      </Middle>
      {modal.open && (
        <Modal
          modalText='검색 코드를 복사했습니다.'
          handleModalOk={() => setModal({ open: false })}
        />
      )}
    </Container>
  );
};

export default SetUserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`;
const ProfileImgContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
  position: relative;
`;

const ProfileImgContainerInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Middle = styled.div`
  width: 100%;
`;

const SettingForm = styled.div`
  & + & {
    margin-top: 24px;
  }
`;

const FormInput = styled.div`
  position: relative;
  width: 100%;
  /* height: 48px; */
  padding: 16px 8px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: ${colors.gray100};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  font-size: 14px;

  input {
    border: none;
    background: transparent;
  }
`;

const InputRight = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px 8px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  font-size: 14px;
  outline: none;
`;

const ImgInput = styled.input`
  /* display: none; */
`;

const IconContainer = styled.label`
  position: absolute;
  right: 0;
  bottom: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray200};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  z-index: 10;
  background-color: ${colors.white};
  transform: translateY(-50%);

  cursor: pointer;

  input {
    display: none;
  }
`;

const IconCopyContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;

  cursor: pointer;
`;
