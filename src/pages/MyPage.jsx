import styled from 'styled-components';
import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import UserInfo from '../components/user/UserInfo';
import AccountButton from '../components/user/AccountButton';
import Achievement from '../components/user/Achievement';

const MyPage = () => {
  return (
    <Layout>
      <Header title='마이페이지' />
      <UserInfo />
      <FlexContainer>
        <Achievement title='이룬 습관' num='25' />
        <Achievement isBadge={true} title='획득한 뱃지' totalNum='20' num='5' />
      </FlexContainer>
      <AccountButton />
      <NavBar />
    </Layout>
  );
};

export default MyPage;

const FlexContainer = styled.div`
  display: flex;
`;
