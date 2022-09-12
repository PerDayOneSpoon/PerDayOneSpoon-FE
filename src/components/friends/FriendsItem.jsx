import styled from 'styled-components';
import { colors } from '../../theme/theme';

const FriendsItem = ({ val }) => {
  const handleFollow = () => {
    console.log(val.socialid);
  };

  return (
    <SearchList>
      <ProfileBox>
        <Img type='image' src={val.imgUrl}></Img>
        <p>{val.nickname}</p>
      </ProfileBox>
      <div>
        <FollowButton onClick={handleFollow}>팔로우</FollowButton>
      </div>
    </SearchList>
  );
};

export default FriendsItem;

const Img = styled.input`
  width: 50px;
  height: 50px;
`;

const SearchList = styled.div`
  width: 100%;
  height: 56px;
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
`;
