import Layout from '../layout/Layout';
import Search from '../components/friends/Search';
import { useEffect } from 'react';
import { getAccessToken } from '../shared/localStorage';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();

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
