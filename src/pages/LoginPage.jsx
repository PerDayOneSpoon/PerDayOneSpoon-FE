import Layout from '../layout/Layout';
import Login from '../components/login/Login';

const LoginPage = () => {
  return (
    <Layout hasNavBar={false}>
      <Login />
    </Layout>
  );
};

export default LoginPage;
