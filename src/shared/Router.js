import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import CollectionPage from '../pages/CollectionPage';
import CreatePage from '../pages/CreatePage';
import CalendarPage from '../pages/CalendarPage';
import MyPage from '../pages/MyPage';
import SearchPage from '../pages/SearchPage';
import KakaoLogin from '../components/login/KakaoLogin';
import GoogleLogin from '../components/login/GoogleLogin';
import SettingPage from '../pages/SettingPage';
import NaverLogin from '../components/login/NaverLogin';
import ScrollToTop from './ScrollToTop';

const Router = () => {
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
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
