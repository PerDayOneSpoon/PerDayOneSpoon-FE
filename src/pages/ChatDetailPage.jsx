import Layout from '../layout/Layout';
import Header from '../components/global/Header';

import { colors } from '../theme/theme';
import ChatDetail from '../components/ChatDetail';

const ChatDetailPage = () => {
  return (
    <Layout hasNavBar={false} bgColor={colors.bgColor}>
      <Header title='채팅' hasBack={true} />
      <ChatDetail></ChatDetail>
    </Layout>
  );
};

export default ChatDetailPage;
