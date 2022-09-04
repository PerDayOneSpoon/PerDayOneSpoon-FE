import Layout from '../layout/Layout';
import Header from '../components/Header';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    getMainAuth();
  }, []);

  function getMainAuth() {
    console.log('getMainAuth...');
    console.log(localStorage.getItem('access-token'));

    axios
      .get(`https://park-minhyeok.shop/api/main/auth`, {
        headers: {
          //Authorization: `${localStorage.getItem('access-token')}`,
          Authorization:
            'Bearer yJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiank5MjNAbmF2ZXIuY29tIiwibWVtYmVyIjoi67Cw7KeAIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MjI5NTczNH0.7aOM70vc0guhSx9Vs-xMQkLGLz1AHnizQLcmbzfxdNe7Z7Wz0v7NFvRLn8a_AsB60TLm7m6ANhd0_gAHLYoEGw',
        },
      })
      .then(function (response) {
        console.log('api/main/auth response success');
        console.log(response.data);

        //response.data.code === 400
        if (response.data.message === '토큰이 만료되었습니다.') {
          getNewAccessToken();
        } else if (response.data.message === '변조된 토큰입니다.') {
          getNewAccessToken();
        }
      })
      .catch(function (error) {
        console.log('api/main/auth response error');

        console.log('error : ' + error);
      });
  }

  function getNewAccessToken() {
    console.log('getNewAccessToken...');
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/login/reissue`, {
        refreshtoken: localStorage.getItem('refresh-token'),
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('error : ' + error);
      });
  }

  return (
    <Layout hasNavBar={true}>
      <Header />
      <MonthCalendar isMain={true} />
      <GoalList />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
