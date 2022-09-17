import { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useMutation, useQueryClient } from 'react-query';
import { friendsApi } from '../../api/friendsApi';

const FriendsItem = ({ val }) => {
  const queryClient = useQueryClient();

  const addFriendMutation = useMutation(friendsApi.addFriend, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getFriends');
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
          <ProfileImg src={val.imgUrl} />
        </ImgContainer>
        <CommonText isSubtitle1={true} fw='500'>
          {val.nickname}
        </CommonText>
      </ProfileBox>
      <div>
        {val.followCheck ? (
          <FollowButton disabled={true}>팔로우</FollowButton>
        ) : (
          <FollowButton onClick={() => handleFollow(val.socialId)}>
            팔로우
          </FollowButton>
        )}
      </div>
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

const FollowButton = styled.button`
  width: 68px;
  height: 28px;
  background-color: ${colors.primary};
  border: none;
  border-radius: 14px;
  color: white;
  cursor: pointer;

  :disabled {
    background-color: ${colors.placeholder};
    cursor: auto;
  }
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
