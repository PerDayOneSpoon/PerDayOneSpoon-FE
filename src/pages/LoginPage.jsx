import Layout from '../layout/Layout';
import Login from '../components/login/Login';

const LoginPage = () => {
  return (
    <Layout hasNavBar={false} bgColor='#ffffff'>
      <Login />
    </Layout>
  );
};

export default LoginPage;
