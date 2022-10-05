import Layout from '../layout/Layout';
import { colors } from '../theme/theme';
import Welcome from '../components/Welcome';

const WelcomePage = () => {
  return (
    <Layout hasNavBar={false} bgColor={colors.orange500}>
      <Welcome />
    </Layout>
  );
};

export default WelcomePage;
