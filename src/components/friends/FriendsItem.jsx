import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useMutation, useQueryClient } from 'react-query';
import { friendsApi } from '../../api/friendsApi';
import CommonButton from '../elements/CommonButton';

const FriendsItem = ({
  val,
  isSearch,
  isFollower,
  isFollowing,
  handleButtonClick,
}) => {
  const queryClient = useQueryClient();

  const addFriendMutation = useMutation(friendsApi.addFriend, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getGoalInfo']);
    },
    onError: ({ response }) => {},
  });

  const handleFollow = (friendId) => {
    addFriendMutation.mutate({ friendId: friendId });
    // setIsFollow(true);
  };

  return (
    <SearchList>
      <ProfileBox>
        <ImgContainer>
          <ProfileImg src={val.profileImage} />
        </ImgContainer>
        {isSearch ? (
          <CommonText isCallout={true} fw='500'>
            {val.nickname}
          </CommonText>
        ) : (
          <ProfileStatusBox>
            <CommonText isCallout={true} mg='0 0 4px 0'>
              {val.nickname}
            </CommonText>
            <CommonText isFootnote1={true} fc={colors.gray500}>
              {val.status}
            </CommonText>
          </ProfileStatusBox>
        )}
      </ProfileBox>
      {isSearch && (
        <div>
          {val.followCheck ? (
            <CommonButton
              text='팔로잉'
              wd='88px'
              pd='8px 0'
              bdrs='20px'
              fz='15px'
              fw='600'
              fc={colors.gray700}
              bg={colors.white}
              bd={`1px solid ${colors.gray200}`}
              disabled={true}
            />
          ) : val.selfCheck ? null : (
            <CommonButton
              handleButtonClick={(e) => {
                e.stopPropagation();
                handleFollow(val.socialId);
              }}
              text='팔로우'
              wd='88px'
              pd='8px 0'
              bdrs='20px'
              fz='15px'
              fw='600'
              fc={colors.white}
              bg={colors.orange500}
              bd='none'
            />
          )}
        </div>
      )}
      {isFollower && (
        <CommonButton
          handleButtonClick={handleButtonClick}
          text='팔로워 끊기'
          wd='90px'
          pd='8px 0'
          bdrs='20px'
          fz='14px'
          fw='600'
          fc={colors.white}
          bg={colors.danger}
          bd='none'
        />
      )}
      {isFollowing && (
        <CommonButton
          handleButtonClick={handleButtonClick}
          text='팔로잉 끊기'
          wd='90px'
          pd='8px 0'
          bdrs='20px'
          fz='14px'
          fw='600'
          fc={colors.white}
          bg={colors.danger}
          bd='none'
        />
      )}
    </SearchList>
  );
};

export default FriendsItem;

const SearchList = styled.div`
  width: 100%;
  height: 56px;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
`;

const ProfileStatusBox = styled.div`
  max-width: 240px;
  word-break: break-all;
`;
