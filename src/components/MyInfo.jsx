import styled from 'styled-components';
import UserInfo from './user/UserInfo';
import Achievement from './user/Achievement';
import CommonButton from './elements/CommonButton';
import Loading from './global/Loading';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { colors } from '../theme/theme';
import { removeToken } from '../shared/localStorage';
import { userApi } from '../api/userApi';
import { NAV_BAR_HEIGHT } from '../constants/common';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../recoil/common';
import { loginState } from '../recoil/common';
import { ReactComponent as IconFeedback } from '../assets/icons/icon-feedback.svg';
import { navBarState } from '../recoil/common';
import { modalState } from '../recoil/common';
import { useRecoilState } from 'recoil';
import Modal from './global/Modal';

const MyInfo = () => {
  const navigate = useNavigate();
  const setUserInfoState = useSetRecoilState(userInfoState);
  const setIsLogin = useSetRecoilState(loginState);
  const setNavBar = useSetRecoilState(navBarState);
  const [modal, setModal] = useRecoilState(modalState);

  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery(['userInfo'], userApi.getUserInfo, {
    onSuccess: (data) => {
      setUserInfoState({
        nickname: data.data.nickname,
        status: data.data.status,
      });
    },
  });

  const { mutate: logoutMutation } = useMutation(userApi.logout, {
    onSuccess: () => {
      removeToken();
      localStorage.removeItem('recoil-persist');
      navigate('/login');
      setIsLogin(false);
    },
  });

  const { mutate: unregisterMutation } = useMutation(userApi.unregister, {
    onSuccess: () => {
      removeToken();
      localStorage.removeItem('recoil-persist');
      navigate('/login');
      setIsLogin(false);
    },
  });

  const handleLogoutModal = () => {
    setModal({ open: true, type: 'confirm' });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Info>
        <UserInfo userInfo={userInfo.data} />
        <BoxContainer>
          <FlexContainer>
            <Achievement title='?????? ??????' num={userInfo.data.goalCnt} />
            <Achievement
              title='????????? ??????'
              num={userInfo.data.badgeCnt}
              handleAchiveClick={() => {
                navigate('/collection');
                setNavBar('??????');
              }}
              cursor='true'
            />
          </FlexContainer>
          <FlexContainer>
            <Achievement
              title='?????????'
              num={userInfo.data.followingCnt}
              handleAchiveClick={() => navigate('/following')}
              cursor='true'
            />
            <Achievement
              title='?????????'
              num={userInfo.data.followerCnt}
              handleAchiveClick={() => navigate('/follower')}
              cursor='true'
            />
          </FlexContainer>
        </BoxContainer>
      </Info>
      <div>
        <LinkButtonContainer></LinkButtonContainer>
        <ButtonGroup>
          <LinkButton>
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLSfruf4XRxmHZ2rfO6q3TmV5W8P4fOFvfhhoaHT6nNBt3jheyA/viewform'
              target='_blank'
              rel='noreferrer'
            >
              ????????? ?????????
            </a>
            {/* <IconContainer>
              <IconFeedback />
            </IconContainer> */}
          </LinkButton>
          <CommonButton
            handleButtonClick={() => handleLogoutModal()}
            text='????????????'
            wd='116px'
            pd='8px 0'
            bg={colors.white}
            fc={colors.gray700}
            fz='15px'
            fw='600'
            bdrs='22px'
            bd={`1px solid ${colors.gray300}`}
          />
          {/* ?????? ?????? ?????? ?????? ?????? */}
          {/* <CommonButton
            handleButtonClick={() => unregisterMutation()}
            text='?????? ????????????'
            wd='116px'
            pd='8px 0'
            bg={colors.white}
            fc={colors.danger}
            fz='15px'
            fw='600'
            bdrs='22px'
            bd={`1px solid ${colors.softDanger}`}
          /> */}
        </ButtonGroup>
      </div>
      {modal.open && (
        <Modal
          modalText='???????????? ???????????????????'
          handleModalOk={() => logoutMutation()}
        />
      )}
    </Container>
  );
};

export default MyInfo;

const Container = styled.div`
  height: calc(100% - ${NAV_BAR_HEIGHT}px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoxContainer = styled.div``;

const Info = styled.div`
  margin-bottom: 40px;
`;

const FlexContainer = styled.div`
  display: flex;

  & + & {
    margin-top: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 24px;

  > div + div {
    margin-left: 16px;
  }
`;

const LinkButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LinkButton = styled.div`
  width: fit-content;
  /* margin-bottom: 20px; */
  position: relative;

  a {
    text-align: center;
    display: inline-block;
    width: 116px;
    /* border: 1px solid ${colors.gray300}; */
    background-color: ${colors.orange500};
    text-decoration: none;
    color: ${colors.white};
    padding: 12px 0;
    font-size: 15px;
    font-weight: 600;
    border-radius: 22px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;

  svg {
    width: 100%;
    height: 100%;
  }
`;
