import Layout from '../layout/Layout';
import Header from '../components/Header';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as refreshToken from '../shared/common';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getMainAuth();
  }, []);

  const getMainAuth = () => {
    console.log('getMainAuth!!!!');
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
        console.log('api/main/auth res success!!!!!!!');
        console.log('res!!!!!!!!!', res);

        if (res.status === 200) {
          console.log('res.status === 200!!!!!!', res);
        }
      })

      .catch(function (error) {
        console.log('api/main/auth res error!!!!!!!', error);

        if (error.message === 'Request failed with status code 408') {
          console.log('408');
          refreshToken.getNewAccessToken();
        } else {
          navigate('/login');
        }
      });
  };

  return (
    <Layout hasNavBar={true}>
      <Header />
      <Graph />
      <GoalList isMain={true} />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
