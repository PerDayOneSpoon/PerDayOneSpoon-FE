import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconLeft } from '../../assets/icons/icon-left.svg';
import { ReactComponent as IconFriend } from '../../assets/icons/icon-addfriend.svg';
import { getAccessToken } from '../../shared/localStorage';
import CommonText from '../elements/CommonText';

const Header = ({
  hasBack,
  hasIcon,
  bgColor,
  title,
  icon,
  handleRightButtonClick,
  rightButton,
}) => {
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
      <Container bgColor={bgColor}>
        <ContainerInner hasBack={hasBack}>
          <IconContainer>
            <IconLeft onClick={() => navigate(-1)} />
          </IconContainer>
          <CommonText isTitle3={true} isBold={true} mg='0 0 0 12px'>
            {title}
          </CommonText>
          <RightButton onClick={handleRightButtonClick}>
            {rightButton}
          </RightButton>
        </ContainerInner>
      </Container>
    );
  } else if (hasIcon) {
    return (
      <Container bgColor={bgColor}>
        <ContainerInner hasIcon={hasIcon}>
          <CommonText isTitle3={true} isBold={true}>
            {title}
          </CommonText>
          <IconContainer>{handleIcons(icon)}</IconContainer>
        </ContainerInner>
      </Container>
    );
  } else {
    return (
      <Container bgColor={bgColor}>
        <ContainerInner>
          <CommonText isTitle3={true} isBold={true}>
            {title}
          </CommonText>
        </ContainerInner>
      </Container>
    );
  }
};

export default Header;

const Container = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  width: calc(100% + 32px);
  padding: 16px 24px;
  box-sizing: border-box;
  margin-left: -16px;
  /* margin-right: -16px; */
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

const RightButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;

  cursor: pointer;
`;
