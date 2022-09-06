import Layout from '../layout/Layout';
import Header from '../components/Header';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';
import Graph from '../components/Graph';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as refreshToken from '../shared/common';
import { getAccessToken } from '../shared/localStorage';

const MainPage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (getAccessToken() == null || getAccessToken() === '') {
  //     navigate('/login');
  //   }
  // }, []);

  // const getMainAuth = () => {

  //   const accessToken = localStorage.getItem('access-token');

  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/api/main/auth`, {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     })
  //     .then(function (res) {
  //       if (res.status === 200) {
  //       }
  //     })
  //     .catch(function (error) {
  //       if (error.message === 'Request failed with status code 408') {
  //         refreshToken.getNewAccessToken();
  //       } else {
  //         navigate('/login');
  //       }
  //     });
  // };

  // if (getAccessToken() == null || getAccessToken() === '') {
  //   navigate('/login');
  // }

  // useEffect(() => {
  //   getMainAuth()

  // }, [])

  return (
    <Layout hasNavBar={true}>
      <Header icon={'create'} />
      <Graph />
      <GoalList isMain={true} />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
