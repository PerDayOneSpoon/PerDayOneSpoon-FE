import Layout from '../layout/Layout';
import Header from '../components/global/Header';

import { colors } from '../theme/theme';
import Chatting from '../components/Chatting';

const ChattingPage = () => {
  return (
    <Layout hasNavBar={false} bgColor={colors.bgColor}>
      <Header title='채팅' hasBack={true} />
      <Chatting></Chatting>
    </Layout>
  );
};

export default ChattingPage;
