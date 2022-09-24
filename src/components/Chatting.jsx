import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import styled from 'styled-components';
import { colors } from '../theme/theme';

const Chatting = () => {
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([]);

  const wsRef = useRef();

  const handleChatting = (e) => {
    setChat(e.target.value);
  };

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      let tmp = {
        // id: chatList.length + 1,
        chat: chat,
        // isMe: true,
        // createdAt: "2022-03-04 22:00"
      };

      setChatList([...chatList, tmp]);
      // 소켓 보내는거

      // wsRef.current.send(('/sendchat', tmp));
      // 얘때문에 지금 아래꺼 안됨
      setChat('');
    }
  };

  useEffect(() => {
    // 채팅페이지 들어오면 전에 채팅내용들도 불러와야 함
    // api get
    // const response = [{},{},{},{},{},{}]
    //  setChatList(response);
  }, []);

  useEffect(() => {
    // let sock = new SockJS('주소');
    // let client = Stomp.over(sock);
    // wsRef.current = client;
    // wsRef.current.connect(() => {
    //   console.log('connected well');
    //   wsRef.current.subscribe('/getchat', (data) => {
    //     setChatList([...chatList, data]);
    //   });
    // });
    // 연결 꼭 끊어주자...
    // return () => {
    //   wsRef.current.disconnect();
    // };
  }, []);

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
        <button>전송</button>
      </InputBox>
    </>
  );
};

export default Chatting;

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
