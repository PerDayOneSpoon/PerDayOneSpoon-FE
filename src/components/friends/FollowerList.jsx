import FriendsItem from './FriendsItem';
import Loading from '../global/Loading';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { friendsApi } from '../../api/friendsApi';

const FollowerList = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: followerList,
  } = useQuery(['getFollower'], friendsApi.getFollower, {
    onSuccess: () => {},
  });

  const { mutate: follwerMutation } = useMutation(friendsApi.deleteFollower, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getFollower');
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {followerList.data.friendDtoList.map((val) => (
        <FriendsItem
          key={val.id}
          val={val}
          isFollower={true}
          handleButtonClick={() => follwerMutation({ friendId: val.socialId })}
        />
      ))}
    </div>
  );
};

export default FollowerList;
