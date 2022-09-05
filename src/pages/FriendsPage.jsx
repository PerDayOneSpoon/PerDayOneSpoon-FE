import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';

const FriendsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  return <Layout>FriendsPage</Layout>;
};

export default FriendsPage;
