import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import CollectionPage from '../pages/CollectionPage';
import CreatePage from '../pages/CreatePage';
import CalendarPage from '../pages/CalendarPage';
import MyPage from '../pages/MyPage';
import SearchPage from '../pages/SearchPage';
import FollowerListPage from '../pages/FollowerListPage';
import FollowingListPage from '../pages/FollowingListPage';
import KakaoLogin from '../components/login/KakaoLogin';
import GoogleLogin from '../components/login/GoogleLogin';
import NaverLogin from '../components/login/NaverLogin';
import SettingPage from '../pages/SettingPage';
import ScrollToTop from './ScrollToTop';
import ChattingPage from '../pages/ChattingPage';
import NoticePage from '../pages/NoticePage';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { getAccessToken } from './localStorage';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { useRecoilState } from 'recoil';
import { realTimeNoticeState } from '../recoil/realTimeData';
import { loginState } from '../recoil/common';

const Router = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useRecoilState(realTimeNoticeState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  /* 실시간 알림 */
  useEffect(() => {
    console.log('매번 실행되는지');
    console.log('listening', listening);
    let eventSource;

    if (!listening) {
      console.log('구독시작!');

      const fetchData = async () => {
        try {
          eventSource = new EventSource(
            `${process.env.REACT_APP_BASE_URL}/sse/subscribe`,
            {
              headers: {
                Authorization: getAccessToken(),
              },
              heartbeatTimeout: 300 * 1000,
              withCredentials: true,
            }
          );
          console.log('EVENT_SOURCE 선언!', eventSource);

          eventSource.onopen = (event) => {
            console.log('connection opened', event);
          };

          eventSource.onmessage = (event) => {
            const result = event.data;
            console.log('파싱한 RESULT', JSON.parse(result));
            setData((old) => [...old, event.data]);
          };

          eventSource.onerror = (event) => {
            console.log('ERROR', event);
            // if (event.target.readyState === EventSource.CLOSED) {
            //   console.log(
            //     'EVENT_SOURCE closed (' + event.target.readyState + ')'
            //   );
            // }
            // eventSource.close();
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
      console.log('eventsource closed');
    };
  }, []);

  useUpdateEffect(() => {
    console.log('useUpdateEffect data(파싱x): ', data);
  }, [data]);

  // useEffect(() => {
  //   console.log('listening', listening);

  //   let eventSource = undefined;

  //   const eventSourceOptions = {
  //     headers: {
  //       Authorization: getAccessToken(),
  //     },
  //     heartbeatTimeout: 300 * 1000,
  //     withCredentials: true,
  //   };

  //   if (isLogin && !listening) {
  //     eventSource = new EventSource(
  //       `${process.env.REACT_APP_BASE_URL}/sse/subscribe`,
  //       eventSourceOptions
  //     ); //구독

  //     console.log('eventSource', eventSource);

  //     eventSource.onopen = (event) => {
  //       console.log('connection opened');
  //     };

  //     eventSource.onmessage = (event) => {
  //       console.log('result', event.data);
  //       setData((old) => [...old, event.data]);
  //     };

  //     eventSource.onerror = (event) => {
  //       console.log(event.target.readyState);
  //       if (event.target.readyState === EventSource.CLOSED) {
  //         console.log('eventsource closed (' + event.target.readyState + ')');
  //       }
  //       eventSource.close();
  //     };

  //     setListening(true);
  //   }

  //   return () => {
  //     eventSource.close();
  //     console.log('eventsource closed');
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<MainPage />} />
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
          <Route path='/chatting' element={<ChattingPage />} />
          <Route path='/notice' element={<NoticePage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
