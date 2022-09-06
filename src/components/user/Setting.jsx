import styled from 'styled-components';
import { colors } from '../../theme/theme';
import { useMutation, useQueryClient } from 'react-query';
import { userApi } from '../../api/userApi';
import { removeToken } from '../../shared/localStorage';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const navigate = useNavigate();
  const { mutate: logoutMutation } = useMutation(userApi.logout, {
    onSuccess: () => {
      removeToken();
      navigate('/login');
    },
  });

  return (
    <Container>
      <AccountButton onClick={() => logoutMutation()}>로그아웃</AccountButton>
      <AccountButton>회원탈퇴</AccountButton>
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  margin-top: 56px;
`;

const AccountButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  text-align: left;
  color: red;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;

  & + & {
    margin-top: 10px;
  }
`;
