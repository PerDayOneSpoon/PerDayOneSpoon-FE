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
import { loginState } from '../recoil/common';

const Router = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  /* 실시간 알림 */
  useEffect(() => {
    let eventSource;

    const fetchData = async () => {
      try {
        eventSource = new EventSource(
          `${process.env.REACT_APP_BASE_URL}/sse/subscribe`,
          {
            headers: {
              Authorization: getAccessToken(),
            },
            withCredentials: true,
          }
        );
        console.log('EVENT_SOURCE 선언!', eventSource);

        eventSource.onopen = async (event) => {
          const result = await event;
          console.log('connection opened', result);
        };

        eventSource.onmessage = async (event) => {
          const result = await event;
          console.log('RESULT', result);
          // setData((old) => [...old, event.data]);
          // setValue(event.data);
        };

        eventSource.onerror = async (event) => {
          const result = await event;
          console.log('ERROR', result);
          // if (event.target.readyState === EventSource.CLOSED) {
          //   console.log(
          //     'EVENT_SOURCE closed (' + event.target.readyState + ')'
          //   );
          // }
          // eventSource.close();
        };

        setListening(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      eventSource.close();
      console.log('eventsource closed');
    };
  }, []);

  useUpdateEffect(() => {
    console.log('data: ', data);
  }, [data]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/login'
            element={isLogin ? <Navigate to='/' /> : <LoginPage />}
          />
          <Route
            path='/user/login/callback'
            element={isLogin ? <Navigate to='/' /> : <KakaoLogin />}
          />
          <Route
            path='/user/login/google'
            element={isLogin ? <Navigate to='/' /> : <GoogleLogin />}
          />
          <Route
            path='/user/login/naver'
            element={isLogin ? <Navigate to='/' /> : <NaverLogin />}
          />
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
