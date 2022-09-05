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
          Authorization: `${localStorage.getItem('access-token')}`,
        },
      })
      .then(function (res) {
        console.log('api/main/auth res success');
        console.log(res.data);

        if (res.data.code === 200) {
          console.log(res.data);
        } else if (res.data.code === 408) {
          refreshToken.getNewAccessToken();
        }
      })
      .catch(function (error) {
        console.log('api/main/auth res error');
        console.log('error : ' + error);
        navigate('/login');
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
