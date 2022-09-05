import Layout from '../layout/Layout';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import UserInfo from '../components/UserInfo';
import { useEffect, useState } from 'react';
import * as refreshToken from '../shared/common';
import axios from 'axios';

const MyPage = () => {
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const accessToken = localStorage.getItem('access-token');

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/confirm/profile`, {
        headers: {
          Authorization: accessToken,
        },
      })

      .then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          setMyInfo(res.data);
        } else if (res.data.code === 408) {
          console.log('res.data.code === 408');
          refreshToken.getNewAccessToken();
        }
      })

      .catch(function (error) {
        console.log('error!!!!!!!', error);
      });
  };

  return (
    <Layout>
      <Header icon={'setting'} />
      <UserInfo isMypage={true} myInfo={myInfo} />
      <NavBar />
    </Layout>
  );
};

export default MyPage;
