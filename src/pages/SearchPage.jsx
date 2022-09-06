import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Search from '../components/Search';

const SearchPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default SearchPage;
