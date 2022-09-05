import Layout from '../layout/Layout';
import Header from '../components/Header';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as refreshToken from '../shared/common';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getMainAuth();
  }, []);

  function getMainAuth() {
    console.log('getMainAuth...');
    console.log(localStorage.getItem('access-token'));
    const accessToken = localStorage.getItem('access-token');

    if (accessToken == null || accessToken === '') {
      navigate('/login');
      return false;
    }

    axios
      .get(`https://park-minhyeok.shop/api/main/auth`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(function (res) {
        console.log('api/main/auth res success');
        console.log(res);

        if (res.status === 200) {
          console.log(res);
        } else if (res.data.code === 408) {
          console.log('res.data.code === 408');
          refreshToken.getNewAccessToken();
        }
      })
      .catch(function (error) {
        console.log('api/main/auth res error');
        console.log(error);

        // 추후 삭제 navigae만 살리기, 변조된 토큰일시 그래프페이지에 테스트!!!!!
        if (error.message === 'Request failed with status code 401') {
          console.log('401');
          refreshToken.getNewAccessToken();
        } else {
          navigate('/login');
        }
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
