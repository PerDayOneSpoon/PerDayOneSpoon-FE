import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useQueryClient, useMutation } from 'react-query';
import { chatApi } from '../api/chatApi';
import styled from 'styled-components';
import { colors } from '../theme/theme';

const ChatList = () => {
  return <></>;
};

export default ChatList;
