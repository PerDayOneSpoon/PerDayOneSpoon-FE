import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import axios from 'axios';
import { setToken } from '../../shared/localStorage';
import Layout from '../../layout/Layout';
import LoginLoading from './LoginLoading';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/common';

const NaverLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);

  let code = new URL(window.location.href).searchParams.get('code');
  let state = new URL(window.location.href).searchParams.get('state');

  // console.log('code!!!!', code);

  useEffect(() => {
    axios
      .get(`${API.NAVER_LOGIN}?code=${code}&state=${state}`)
      .then((res) => {
        // console.log('네이버로그인 성공', res);
        console.log('네이버로그인 성공');

        if (res.data.code === 200) {
          setToken(res.headers.authorization, res.headers.refreshtoken);
          // navigate('/');
          window.location.replace('/');
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

export default NaverLogin;
