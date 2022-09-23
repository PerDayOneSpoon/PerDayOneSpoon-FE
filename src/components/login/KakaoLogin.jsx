import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import axios from 'axios';
import { setToken } from '../../shared/localStorage';
import LoginLoading from './LoginLoading';
import Layout from '../../layout/Layout';

const KakaoLogin = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get('code');

  // console.log('code!!!!', code);

  useEffect(() => {
    axios
      .get(`${API.KAKAO_LOGIN}?code=${code}`)
      .then((res) => {
        // console.log('카카오로그인 성공', res);
        console.log('카카오로그인 성공');

        if (res.data.code === 200) {
          setToken(res.headers.authorization, res.headers.refreshtoken);
          navigate('/');
        } else {
          navigate('/login');
        }
      })
      .catch(function (error) {
        console.log('error : ' + error);
      });
  }, [code, navigate]);

  return (
    <Layout>
      <LoginLoading />
    </Layout>
  );
};

export default KakaoLogin;
