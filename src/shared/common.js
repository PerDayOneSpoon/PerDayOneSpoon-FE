import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const getNewAccessToken = async () => {
  console.log('getNewAccessToken...');

  const navigate = useNavigate;
  const refreshToken = localStorage.getItem('refresh-token');
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/user/login/reissue`,
      {},
      {
        headers: {
          refreshToken: refreshToken,
        },
      }
    )
    .then(function (res) {
      console.log(res.data);
      if (res.data.code === 200) {
        localStorage.setItem('access-token', res.headers.authorization);
        localStorage.setItem('refresh-token', res.headers.refreshtoken);
        // localStorage -> token reSave
        window.location.reload(); //page refresh
      }
    })
    .catch(function (error) {
      console.log('error : ' + error);

      // logout api
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');

      navigate('/login');
    });
};
