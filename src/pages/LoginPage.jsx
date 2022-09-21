import Layout from '../layout/Layout';
import Login from '../components/login/Login';
import { colors } from '../theme/theme';

const LoginPage = () => {
  return (
    <Layout hasNavBar={false} bgColor='#ffffff'>
      <Login />
    </Layout>
  );
};

export default LoginPage;
