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

const MyInfo = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery('getUserInfo', userApi.getUserInfo, {
    onSuccess: (data) => {},
  });

  const { mutate: logoutMutation } = useMutation(userApi.logout, {
    onSuccess: () => {
      removeToken();
      localStorage.removeItem('recoil-persist');
      navigate('/login');
    },
  });

  const { mutate: unregisterMutation } = useMutation(userApi.unregister, {
    onSuccess: () => {
      removeToken();
      localStorage.removeItem('recoil-persist');
      navigate('/login');
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Info>
        <UserInfo userInfo={userInfo.data} />
        <BoxContainer>
          <FlexContainer>
            <Achievement title='이룬 습관' num={userInfo.data.goalCnt} />
            <Achievement
              isBadge={true}
              title='획득한 뱃지'
              totalNum='20'
              num='5'
            />
          </FlexContainer>
          <FlexContainer>
            <Achievement
              title='팔로잉'
              num={userInfo.data.followingCnt}
              handleAchiveClick={() => navigate('/following')}
              cursor='true'
            />
            <Achievement
              title='팔로워'
              num={userInfo.data.followerCnt}
              handleAchiveClick={() => navigate('/follower')}
              cursor='true'
            />
          </FlexContainer>
        </BoxContainer>
      </Info>
      <ButtonGroup>
        <CommonButton
          handleButtonClick={() => logoutMutation()}
          text='로그아웃'
          wd='116px'
          pd='8px 0'
          bg={colors.white}
          fc={colors.gray700}
          fz='15px'
          fw='600'
          bdrs='22px'
          bd={`1px solid ${colors.gray300}`}
        />
        <CommonButton
          handleButtonClick={() => unregisterMutation()}
          text='계정 삭제하기'
          wd='116px'
          pd='8px 0'
          bg={colors.white}
          fc={colors.danger}
          fz='15px'
          fw='600'
          bdrs='22px'
          bd={`1px solid ${colors.softDanger}`}
        />
      </ButtonGroup>
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
  padding-bottom: 40px;

  > div + div {
    margin-left: 16px;
  }
`;
