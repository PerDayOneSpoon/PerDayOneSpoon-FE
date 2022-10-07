import Layout from '../layout/Layout';
import { colors } from '../theme/theme';
import Onboarding from '../components/Onboarding';

const OnboardingPage = () => {
  return (
    <Layout hasNavBar={false} bgColor={colors.orange500}>
      <Onboarding />
    </Layout>
  );
};

export default OnboardingPage;
