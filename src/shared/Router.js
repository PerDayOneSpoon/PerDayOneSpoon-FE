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
import SettingPage from '../pages/SettingPage';
import NaverLogin from '../components/login/NaverLogin';
import ScrollToTop from './ScrollToTop';
import ChattingPage from '../pages/ChattingPage';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../api/goalApi';
import { useEffect } from 'react';
import { goalTimeFamily } from '../recoil/goal';
import { useRecoilState } from 'recoil';
import { clickedGoalId } from '../recoil/goal';
import { useRecoilCallback } from 'recoil';

const Router = () => {
  const queryClient = useQueryClient();

  const achieveGoalMutation = useMutation(goalApi.achieveGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['goalInfo']);
      queryClient.invalidateQueries(['peopleSearchDate']);
      queryClient.invalidateQueries(['personGoal']);
    },
    onError: (error) => {},
  });

  const handleTimerStartCilck = (id) => {
    console.log(id, '시작');

    const localStorageData = JSON.parse(localStorage.getItem('goals'))[
      `goalTimeFamily__${id}`
    ];
    console.log('localStorageData!!', localStorageData.totalTime);

    const startTimer = setInterval(() => {
      localStorageData.currentTime += 1;

      const newLocalData = {
        ...localStorageData,
        currentTime: localStorageData.currentTime,
      };

      localStorage.setItem(`goals${id}`, JSON.stringify(newLocalData));

      // const percentage = (localStorageData.totalTime / )

      if (
        JSON.parse(localStorage.getItem(`goals${id}`)).currentTime ===
        JSON.parse(localStorage.getItem(`goals${id}`)).totalTime
      ) {
        clearInterval(startTimer);
        const data = {
          goalId: id,
          achivement: true,
        };
        achieveGoalMutation.mutate(data);
        // localStorage.removeItem(`goals${id}`);
      }
    }, 1000);

    return id;
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('goals'));
    const localDataArr = [];

    for (let key in localStorageData) {
      localDataArr.push(localStorageData[key]);
    }

    console.log(localDataArr);

    localDataArr.map((item) => {
      if (localStorage.getItem(`goals${item.id}`) === null) {
        localStorage.setItem(`goals${item.id}`, JSON.stringify({ ...item }));
      }
    });

    // localStorage.setItem(`goals${id}`, JSON.stringify(newLocalData));
  }, []);

  // const goalId = handleTimerStartCilck();

  // const [changeTime, setChangeTime] = useRecoilState(goalId);
  const startProgress = () => {
    // testTime.isPlay && setCurrentTime((s) => s + 1);
    // changeTime.isPlay &&
    //   setChangeTime((prev) => ({ ...prev, currentTime: prev.currentTime + 1 }));
    // if (changeTime.ss > 0) {
    //   setChangeTime((prev) => ({ ...prev, ss: prev.ss - 1 }));
    // }
    // if (changeTime.ss === 0) {
    //   if (changeTime.mm === 0) {
    //     if (changeTime.hh === 0) {
    //       // setIsPlay(false);
    //       setChangeTime((prev) => ({ ...prev, isPlay: false }));
    //     } else {
    //       setChangeTime((prev) => ({ ...prev, hh: prev.hh - 1 }));
    //       setChangeTime((prev) => ({ ...prev, mm: 59 }));
    //       setChangeTime((prev) => ({ ...prev, ss: 59 }));
    //     }
    //   } else {
    //     setChangeTime((prev) => ({ ...prev, mm: prev.mm - 1 }));
    //     setChangeTime((prev) => ({ ...prev, ss: 59 }));
    //   }
    // }
  };

  // console.log('changeTime!', changeTime);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route
            path='/'
            element={<MainPage handleTimerStartCilck={handleTimerStartCilck} />}
          />
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
