import FriendsItem from './FriendsItem';
import Loading from '../global/Loading';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { friendsApi } from '../../api/friendsApi';

const FollowingList = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: followingList,
  } = useQuery(['followingList'], friendsApi.getFollowing, {
    onSuccess: () => {},
  });

  const { mutate: follwingMutation } = useMutation(friendsApi.deleteFollowing, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('followingList');
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {followingList.data.friendDtoList.map((val) => (
        <FriendsItem
          key={val.id}
          val={val}
          isFollowing={true}
          handleButtonClick={() => follwingMutation({ friendId: val.socialId })}
        />
      ))}
    </div>
  );
};

export default FollowingList;
