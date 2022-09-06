import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import CollectionPage from '../pages/CollectionPage';
import CreatePage from '../pages/CreatePage';
import Calendar from '../pages/CalendarPage';
import MyPage from '../pages/MyPage';
import SearchPage from '../pages/SearchPage';
import SettingPage from '../pages/SettingPage';
import KakaoLogin from '../components/KakaoLogin';
import GoogleLogin from '../components/GoogleLogin';
import GraphPage from '../pages/GraphPage';
import { useQuery } from 'react-query';
import { apis } from '../api/api';
import { useCallback } from 'react';
import { getNewAccessToken } from './common';

const Router = () => {
  // const navigate = useNavigate();

  // const refreshLogin = useCallback(async () => {
  //   const token = getRefreshToken();
  //   if (token) {
  //     try {
  //       const response = await apiUser.refresh({ refreshToken: token });
  //       setToken(response.data.accessToken, response.data.refreshToken);
  //       setLogin(true);
  //     } catch (err) {
  //       removeToken();
  //       setLogin(false);
  //     }
  //   }
  // }, [setLogin])

  // useEffect(() => {
  //   getNewAccessToken();
  // }, []);

  // useQuery('getUser', apis.getUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user/login/callback' element={<KakaoLogin />} />
        <Route path='/user/login/google' element={<GoogleLogin />} />
        <Route path='/collection' element={<CollectionPage />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/graph' element={<GraphPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
