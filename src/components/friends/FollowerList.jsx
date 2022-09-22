import FriendsItem from './FriendsItem';
import Loading from '../global/Loading';
import Modal from '../global/Modal';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { friendsApi } from '../../api/friendsApi';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/common';
import { useState } from 'react';

const FollowerList = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useRecoilState(modalState);
  const [userId, setUserId] = useState('');

  const {
    isLoading,
    isError,
    error,
    data: followerList,
  } = useQuery(['followerList'], friendsApi.getFollower, {
    onSuccess: () => {},
  });

  const { mutate: follwerMutation } = useMutation(friendsApi.deleteFollower, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('followerList');
    },
  });

  const handleDeleteClick = (socialId) => {
    setUserId(socialId);
    setModal({ open: true, type: 'confirm' });
  };

  const handleDeleteFollower = () => {
    follwerMutation({ friendId: userId });
    setModal({ open: false });
  };

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
          // handleButtonClick={() => follwerMutation({ friendId: val.socialId })}
          handleButtonClick={() => handleDeleteClick(val.socialId)}
        />
      ))}
      {modal.open && (
        <Modal
          modalText='팔로워를 끊으시겠습니까?'
          handleModalOk={handleDeleteFollower}
        />
      )}
    </div>
  );
};

export default FollowerList;
