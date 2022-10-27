import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useQueryClient, useMutation } from 'react-query';
import { chatApi } from '../api/chatApi';
import styled from 'styled-components';
import { colors } from '../theme/theme';

const ChatDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const roomId = params.id;
  const queryClient = useQueryClient();

  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([]);
  const wsRef = useRef();

  // 상대방 정보
  const [otherUserInfo, setOtherUserInfo] = useState([]);

  // 상대방 정보 가져오기
  useEffect(() => {
    chatApi
      .createChat('bee93e20-c166-4a7b-ba3f-49b4cf4e2958')
      .then((response) => {
        setOtherUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const createChatMutation = useMutation(chatApi.createChat, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries('createChatRoom');
  //   },
  // });

  // const handleCreateChat = (friendId) => {
  //   createChatMutation.mutate({ friendId: friendId });
  // };

  const handleChatting = (e) => {
    setChat(e.target.value);
  };

  // 채팅방 이전 메세지 가져오기
  useEffect(() => {
    // api get
    // const response = [{},{},{},{},{},{}]
    // setChatList(response);
  }, []);

  // 소켓 연결
  useEffect(() => {
    let sock = new SockJS(`${process.env.REACT_APP_BASE_URL}/websocket`);
    let client = Stomp.over(sock);
    wsRef.current = client;
    wsRef.current.connect({}, () => {
      console.log('connected well');
      wsRef.current.subscribe('/sub/chat/room/1', (data) => {
        // const newMassage = JSON.parse(data.body);
        setChatList([...chatList, data]);
      });
    });

    // 소켓 연결 해제
    return () => {
      wsRef.current.disconnect();
    };
  }, []);

  // 메시지 발신
  const handlePress = (e) => {
    if (e.key === 'Enter') {
      // 서버에 보낼 데이터
      let data = {
        // roomId: 'bee93e20-c166-4a7b-ba3f-49b4cf4e2958',
        // id: chatList.length + 1,
        message: chat,
        // isMe: true,
        // createdAt: "2022-03-04 22:00"
      };

      // 화면에 띄울 데이터
      let tmp = {
        // id: chatList.length + 1,
        chat: chat,
        isMe: false,
        // createdAt: '2022-03-04 22:00',
      };

      setChatList([...chatList, tmp]);

      if (chat === '') {
        return;
      }

      // send massage
      wsRef.current.send('/pub/chat/message', data);
      setChat('');
    }
  };

  return (
    <>
      <ChattingBox>
        {chatList.map((chatting) => {
          return (
            <Bubble key={chatting.id} isMe={chatting.isMe}>
              {chatting.chat}
            </Bubble>
          );
        })}
      </ChattingBox>
      <InputBox>
        <input
          type='text'
          value={chat}
          onChange={handleChatting}
          onKeyPress={handlePress}
        />
        <button
        // onClick={handleCreateChat}
        >
          전송
        </button>
      </InputBox>
    </>
  );
};

export default ChatDetail;

const ChattingBox = styled.div`
  background-color: ${colors.white};
  width: 100%;
  height: 600px;
`;

const Bubble = styled.div`
  color: ${(props) => (props.isMe ? 'red' : 'blue')};
  display: flex;
  justify-content: ${(props) => (props.isMe ? 'end' : 'start')};
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
