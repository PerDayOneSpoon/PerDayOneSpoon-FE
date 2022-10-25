import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import ChatList from '../components/ChatList';

import { colors } from '../theme/theme';

const ChatListPage = () => {
  return (
    <Layout hasNavBar={false} bgColor={colors.bgColor}>
      <Header title='채팅' hasBack={true} />
      <ChatList />
    </Layout>
  );
};

export default ChatListPage;
