import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import useInterval from '../hooks/useInterval';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { goalTimeFamily } from '../recoil/goal';
import { goalTimeId } from '../recoil/goal';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../api/goalApi';
import { getAccessToken } from './localStorage';
import { loginState } from '../recoil/common';
import { timerState } from '../recoil/goal';
import { stringToTime } from '../utils/stringToTime';

const Router = () => {
  // const queryClient = useQueryClient();

  // const [timerInterval, setTimerInterval] = useState(0);
  // const [clickedId, setClickedId] = useRecoilState(goalTimeId);
  // const [testTime, setTestTime] = useRecoilState(goalTimeFamily);
  // const [isLogin, setIsLogin] = useRecoilState(loginState);

  // console.log('clickedId!!!', clickedId);
  // console.log('timerState!!!', timerState);

  // const handleStartCilck = (id) => {
  //   console.log(id, 'click!');
  //   console.log('testTime', testTime);

  //   setTestTime((prev) => ({ ...prev, isPlay: true }));
  //   setTimerInterval(customInterval);
  // };

  // const achieveGoalMutation = useMutation(goalApi.achieveGoal, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries(['goalInfo']);
  //     queryClient.invalidateQueries(['peopleSearchDate']);
  //     queryClient.invalidateQueries(['personGoal']);
  //   },
  //   onError: (error) => {},
  // });

  // const startProgress = () => {
  //   setTestTime((prev) => ({
  //     ...prev,
  //     currentTime: prev.currentTime + 1,
  //     displayTime: prev.displayTime - 1,
  //   }));
  //   if (testTime.displayTime === 1) {
  //     setTestTime((prev) => ({
  //       ...prev,
  //       isPlay: false,
  //     }));
  //     clearInterval(customInterval);
  //     const data = {
  //       goalId: clickedId,
  //       achivement: true,
  //     };
  //     achieveGoalMutation.mutate(data);
  //   }
  // };

  // const customInterval = useInterval(
  //   () => {
  //     if (
  //       testTime.isDone === (false || undefined) &&
  //       testTime.displayTime === 0
  //     ) {
  //       alert('오류가 발생했습니다. 다시 시도해 주세요.');
  //       setTestTime({ ...testTime, isPlay: false });
  //       window.location.reload();
  //     }
  //     if (testTime.isPlay) {
  //       startProgress();
  //     }
  //   },
  //   testTime.isPlay ? 1000 : null
  // );

  // useEffect(() => {
  //   if (testTime.isPlay) {
  //     setTimerInterval(customInterval);
  //   }
  // }, [testTime.isPlay]);

  // // console.log('isLogin???', isLogin);

  // let i = 0;

  // const asyncFunc = async () => {
  //   const response = await goalApi.getGoal();
  //   const getTime = response.data.todayGoalsDtoList.map((item) => item.time);
  //   const isDone = response.data.todayGoalsDtoList.map(
  //     (item) => item.achievementCheck
  //   );
  //   const goalId = response.data.todayGoalsDtoList.map((item) => item.id);
  //   const timeValue = {
  //     id: goalId,
  //     totalTime: getTime,
  //     displayTime: getTime,
  //     isPlay: false,
  //     currentTime: 0,
  //     isDone: isDone,
  //   };
  //   i++;

  //   setTestTime({ ...testTime, timeValue });
  // };

  // useEffect(() => {
  //   if (isLogin) {
  //     asyncFunc();
  //   }
  // }, [isLogin]);

  // console.log('testTime!!!', testTime);

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
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
