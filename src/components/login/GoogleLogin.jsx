import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import axios from 'axios';
import { setToken } from '../../shared/localStorage';
import Layout from '../../layout/Layout';
import LoginLoading from './LoginLoading';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/common';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);

  let code = new URL(window.location.href).searchParams.get('code');

  // console.log('code!!!!!!', code);

  useEffect(() => {
    axios
      .get(`${API.GOOGLE_LOGIN}?code=${code}`)
      .then((res) => {
        // console.log('구글 로그인 성공', res);
        console.log('구글 로그인 성공');

        if (res.data.code === 200) {
          setToken(res.headers.authorization, res.headers.refreshtoken);
          navigate('/');
          setIsLogin(true);
        } else {
          navigate('/login');
        }
      })
      .catch(function (error) {
        console.log('error : ' + error);
      });
  }, []);

  return (
    <Layout>
      <LoginLoading />
    </Layout>
  );
};

export default GoogleLogin;
