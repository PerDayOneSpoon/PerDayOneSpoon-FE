import styled from 'styled-components';
import Header from './Header';
import UserInfo from './UserInfo';
import { colors } from '../theme/theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as refreshToken from '../shared/common';

const Setting = () => {
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken == null || accessToken === '') {
      navigate('/login');
      return false;
    }

    axios
      .get(`https://park-minhyeok.shop/set/profile`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          //setMyInfo(res.data);
        } else if (res.data.code === 408) {
          console.log('res.data.code === 408');
          refreshToken.getNewAccessToken();
        }
      })
      .catch(function (error) {
        // if (error.message === 'Request failed with status code 400') {
        //   refreshToken.getNewAccessToken();
        // } else {
        //   navigate('/login');
        // }
        // temp data

        const temp = {
          id: 1,
          email: 'fdf@naver.com',
          nickname: '바지',
          code: 200,
          socialcode: '142523',
          imgurl: 'sfdjsklf.png',
          status: '배고파',
        };

        setMyInfo(temp);
      });
  }

  const doLogout = () => {
    const accessToken = localStorage.getItem('access-token');

    axios
      .delete(`https://park-minhyeok.shop/delete/user/logout`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(function (res) {
        console.log(res);
        // localStorage.removeItem('access-token')
        if (res.status === 200) {
          //res.data.code === 200
          localStorage.removeItem('access-token');
          localStorage.removeItem('refresh-token');
          navigate('/login');
        } else if (res.data.code === 400) {
          console.log('res.data.code === 400');
        }
      })
      .catch(function (error) {
        if (error.data.code === 400) {
          console.log('error.data.code === 400');
        }
      });
  };

  return (
    <Container>
      <Header isTitle={true} title='계정' />
      <Top>
        <UserInfo />
        <ChangingText>프로필사진바꾸기</ChangingText>
      </Top>

      <Middle>
        <SettingForm>
          <FormLeft>이름</FormLeft>
          <FormRight>이름</FormRight>
        </SettingForm>
        <SettingForm>
          <FormLeft>상태 메세지</FormLeft>
          <FormRight>{myInfo.status}</FormRight>
        </SettingForm>
      </Middle>

      <Bottom>
        <AccountButton onClick={doLogout}>로그아웃</AccountButton>
        <AccountButton>회원탈퇴</AccountButton>
      </Bottom>
    </Container>
  );
};

export default Setting;

const Container = styled.div``;

const Top = styled.div`
  height: 172px;
  padding: 16px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const ChangingText = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 4px;
  font-size: 16px;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
`;

const Middle = styled.div`
  border-top: 1px solid ${colors.border};
  padding-top: 24px;
`;

const SettingForm = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 24px;
  }
`;

const FormLeft = styled.div`
  min-width: 90px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

const FormRight = styled.div`
  width: 100%;
  margin-left: 16px;
  opacity: 0.3;
  border-bottom: 1px solid ${colors.border};
  padding: 8px 0;
`;

const Bottom = styled.div`
  margin-top: 100px;
`;
const AccountButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  text-align: left;
  color: red;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;

  & + & {
    margin-top: 10px;
  }
`;
