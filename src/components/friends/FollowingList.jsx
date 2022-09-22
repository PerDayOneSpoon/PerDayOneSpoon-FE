import FriendsItem from './FriendsItem';
import Loading from '../global/Loading';
import Modal from '../global/Modal';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/common';
import { friendsApi } from '../../api/friendsApi';
import { useState } from 'react';

const FollowingList = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useRecoilState(modalState);
  const [userId, setUserId] = useState('');

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

  const handleDeleteClick = (socialId) => {
    setUserId(socialId);
    setModal({ open: true, type: 'confirm' });
  };

  const handleDeleteFollowing = () => {
    follwingMutation({ friendId: userId });
    setModal({ open: false });
  };

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
          // handleButtonClick={() => follwingMutation({ friendId: val.socialId })}
          handleButtonClick={() => handleDeleteClick(val.socialId)}
        />
      ))}
      {modal.open && (
        <Modal
          modalText='팔로우를 끊으시겠습니까?'
          handleModalOk={handleDeleteFollowing}
        />
      )}
    </div>
  );
};

export default FollowingList;
