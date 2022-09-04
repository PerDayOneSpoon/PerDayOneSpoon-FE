import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IconAdd } from '../assets/icons/icon-add.svg';
import { ReactComponent as IconLeft } from '../assets/icons/icon-left.svg';

const Header = ({ isTitle, title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  if (isTitle) {
    return (
      <Container>
        <ContainerInner isTitle={isTitle}>
          <IconContainer>
            <IconLeft onClick={() => navigate(-1)} />
          </IconContainer>
          <TitleText>{title}</TitleText>
          <button>추가</button>
        </ContainerInner>
      </Container>
    );
  } else {
    return (
      <Container>
        <ContainerInner>
          <IconContainer>
            <IconAdd onClick={() => navigate('/create')} />
          </IconContainer>
        </ContainerInner>
      </Container>
    );
  }
};

export default Header;

const Container = styled.div`
  background-color: #eee;
  width: calc(100% + 32px);
  height: 56px;
  padding: 16px;
  box-sizing: border-box;
  margin-left: -16px;
  margin-bottom: 16px;
`;

const ContainerInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ isTitle }) => (isTitle ? 'space-between' : 'flex-end')};
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TitleText = styled.h2``;
