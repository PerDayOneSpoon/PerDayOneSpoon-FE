import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { getAccessToken } from './localStorage';
import {
  realTimeNoticeState,
  welcomeMessageState,
} from '../recoil/realTimeData';
import { loginState } from '../recoil/common';

import LoginPage from '../pages/LoginPage';
import KakaoLogin from '../components/login/KakaoLogin';
import GoogleLogin from '../components/login/GoogleLogin';
import NaverLogin from '../components/login/NaverLogin';
import ScrollToTop from './ScrollToTop';

const MainPage = lazy(() => import('../pages/MainPage'));
const CollectionPage = lazy(() => import('../pages/CollectionPage'));
const CreatePage = lazy(() => import('../pages/CreatePage'));
const CalendarPage = lazy(() => import('../pages/CalendarPage'));
const MyPage = lazy(() => import('../pages/MyPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const FollowerListPage = lazy(() => import('../pages/FollowerListPage'));
const FollowingListPage = lazy(() => import('../pages/FollowingListPage'));
const SettingPage = lazy(() => import('../pages/SettingPage'));
const NoticePage = lazy(() => import('../pages/NoticePage'));
const OnboardingPage = lazy(() => import('../pages/OnboardingPage'));
const ChatListPage = lazy(() => import('../pages/ChatListPage'));
const ChatDetailPage = lazy(() => import('../pages/ChatDetailPage'));

const Router = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useRecoilState(realTimeNoticeState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [welcomeMessage, setWelcomeMessage] =
    useRecoilState(welcomeMessageState);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  /* 실시간 알림 */
  useEffect(() => {
    console.log('listening', listening);
    let eventSource;

    if (isLogin && !listening) {
      const fetchData = async () => {
        try {
          eventSource = new EventSource(
            `${process.env.REACT_APP_BASE_URL}/sse/subscribe`,
            {
              headers: {
                Authorization: getAccessToken(),
              },
              withCredentials: true,
              heartbeatTimeout: 300 * 1000,
            }
          );

          eventSource.onopen = (event) => {
            // console.log('connection opened', event);
          };

          eventSource.onmessage = (event) => {
            const result = JSON.parse(event.data);

            if (result.notificationType === 'Notice') {
              setWelcomeMessage(result.message);
            }

            if (!result.read && result.notificationType !== 'Notice') {
              setData((old) => [result, ...old]);
            }
          };

          eventSource.onerror = (event) => {
            // console.log('ERROR', event);
          };
        } catch (error) {
          alert(error);
        }
      };

      fetchData();
    }
    setListening(true);

    return () => {
      eventSource.close();
    };
  }, []);

  useUpdateEffect(() => {
    // console.log('useUpdateEffect data: ', data);
  }, [data]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/welcome' element={<OnboardingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/user/login/callback' element={<KakaoLogin />} />
          <Route path='/user/login/google' element={<GoogleLogin />} />
          <Route path='/user/login/naver' element={<NaverLogin />} />
          <Route path='/collection' element={<CollectionPage />} />
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/following' element={<FollowingListPage />} />
          <Route path='/follower' element={<FollowerListPage />} />
          <Route path='/notice' element={<NoticePage />} />
          <Route path='/chatlist' element={<ChatListPage />} />
          <Route path='/chatdetail' element={<ChatDetailPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
