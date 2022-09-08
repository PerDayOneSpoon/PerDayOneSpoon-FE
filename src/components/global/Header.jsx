import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as IconAdd } from '../../assets/icons/icon-add.svg';
import { ReactComponent as IconLeft } from '../../assets/icons/icon-left.svg';
import { ReactComponent as IconFriend } from '../../assets/icons/icon-addfriend.svg';
import { colors } from '../../theme/theme';
import { ReactComponent as IconRight } from '../../assets/icons/icon-right.svg';
import { getAccessToken } from '../../shared/localStorage';

const Header = ({ hasBack, hasIcon, isBg, title, icon, handleOkClick }) => {
  const navigate = useNavigate();

  const handleIcons = (icon) => {
    if (icon === 'addFriend') {
      return <IconFriend onClick={() => navigate('/search')} />;
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  if (hasBack) {
    return (
      <Container>
        <ContainerInner hasBack={hasBack}>
          <IconContainer>
            <IconLeft onClick={() => navigate(-1)} />
          </IconContainer>
          <TitleText>{title}</TitleText>
          <button onClick={handleOkClick}>추가</button>
        </ContainerInner>
      </Container>
    );
  } else if (hasIcon) {
    return (
      <Container>
        <ContainerInner hasIcon={hasIcon}>
          <TitleText>{title}</TitleText>
          <IconContainer>{handleIcons(icon)}</IconContainer>
        </ContainerInner>
      </Container>
    );
  } else {
    return (
      <Container isBg={isBg}>
        <ContainerInner>
          <TitleText>{title}</TitleText>
        </ContainerInner>
      </Container>
    );
  }
};

export default Header;

const Container = styled.div`
  background-color: ${({ isBg }) => (isBg ? colors.secondary : colors.white)};
  width: calc(100% + 32px);
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
  justify-content: ${({ hasBack, hasIcon }) =>
    (hasBack || hasIcon) && 'space-between'};
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TitleText = styled.h2`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
`;
