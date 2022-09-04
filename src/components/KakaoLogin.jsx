import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/api';
import axios from 'axios';

function KakaoLogin() {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get('code');

  console.log('code@@@@@', code);

  useEffect(() => {
    axios
      .get(`${API.KAKAO_LOGIN}?code=${code}`)

      .then((res) => {
        console.log('res@@@@@', res);

        if (res.data.code === 200) {
          localStorage.setItem('access-token', res.headers.authorization);
          localStorage.setItem('refresh-token', res.headers.refreshtoken);

          navigate('/');
        } else {
          navigate('/login');
        }
      })
      .catch(function (error) {
        console.log('error : ' + error);
      });
  }, [code, navigate]);

  return <div>카카오 로그인</div>;
}

export default KakaoLogin;