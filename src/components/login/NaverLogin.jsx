import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import axios from 'axios';
import { setToken } from '../../shared/localStorage';

const NaverLogin = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get('code');
  let state = new URL(window.location.href).searchParams.get('state');

  console.log('code!!!!', code);

  useEffect(() => {
    axios
      .get(`${API.NAVER_LOGIN}?code=${code}&state=${state}`)
      .then((res) => {
        console.log('네이버로그인 성공', res);

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
  }, [code, state, navigate]);

  return <div>네이버 로그인</div>;
};

export default NaverLogin;
