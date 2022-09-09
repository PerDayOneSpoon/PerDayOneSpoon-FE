import styled from 'styled-components';
import { colors } from '../../theme/theme';

const FriendsItem = ({ val }) => {
  const followhandler = () => {
    console.log(val.socialid);
  };

  return (
    <SearchList>
      <p>{val.userId}</p>
      <FollowButton onClick={followhandler}>팔로우</FollowButton>
    </SearchList>
  );
};

export default FriendsItem;

const SearchList = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
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
