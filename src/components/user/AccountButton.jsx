import styled from 'styled-components';
import { colors } from '../../theme/theme';
import { useMutation } from 'react-query';
import { userApi } from '../../api/userApi';
import { removeToken } from '../../shared/localStorage';
import { useNavigate } from 'react-router-dom';

const AccountButton = () => {
  const navigate = useNavigate();
  const { mutate: logoutMutation } = useMutation(userApi.logout, {
    onSuccess: () => {
      removeToken();
      navigate('/login');
    },
  });

  const { mutate: unregisterMutation } = useMutation(userApi.unregister, {
    onSuccess: () => {
      removeToken();
      navigate('/login');
    },
  });

  return (
    <Container>
      <Button onClick={() => logoutMutation()}>로그아웃</Button>
      <Button onClick={() => unregisterMutation()}>회원탈퇴</Button>
    </Container>
  );
};

export default AccountButton;

const Container = styled.div`
  margin-top: 56px;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${colors.white};
  border: none;
  outline: none;
  text-align: left;
  color: ${colors.danger};
  font-size: 16px;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  & + & {
    margin-top: 16px;
  }
`;
