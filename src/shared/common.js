// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const getNewAccessToken = async () => {
//   const navigate = useNavigate;
//   const refreshToken = localStorage.getItem('refresh-token');

//   await axios
//     .post(
//       `${process.env.REACT_APP_BASE_URL}/login/reissue`,
//       {},
//       {
//         headers: {
//           refreshToken: refreshToken,
//         },
//       }
//     )

//     .then(function (res) {

//       if (res.data.code === 200) {
//         localStorage.setItem('access-token', res.headers.authorization);
//         localStorage.setItem('refresh-token', res.headers.refreshtoken);

//         // window.location.reload();
//         navigate('/');
//       }
//     })

//     .catch(function (error) {
//       // logout api
//       localStorage.removeItem('access-token');
//       localStorage.removeItem('refresh-token');

//       navigate('/login');
//     });
// };
