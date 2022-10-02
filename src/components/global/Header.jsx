import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconLeft } from '../../assets/icons/icon-left.svg';
import { ReactComponent as IconFriend } from '../../assets/icons/icon-addfriend.svg';
import { ReactComponent as IconNotification } from '../../assets/icons/icon-notification.svg';
import { ReactComponent as IconNotificationAlram } from '../../assets/icons/icon-notification-alram.svg';
import { getAccessToken } from '../../shared/localStorage';
import CommonText from '../elements/CommonText';
import { colors } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { realTimeNoticeState } from '../../recoil/realTimeData';

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
  const [noticeData, setNoticeData] = useRecoilState(realTimeNoticeState);

  const handleIcons = (icon) => {
    if (icon === 'addFriend') {
      return <IconFriend onClick={() => navigate('/search')} />;
    }
    if (icon === 'notification') {
      return <IconNotification onClick={() => navigate('/notice')} />;
    }
    if (icon === 'notificationAlram') {
      return (
        <IconNotificationAlram
          onClick={() => {
            navigate('/notice');
            setNoticeData(
              noticeData.map((item) => {
                return { ...item, read: true };
              })
            );
          }}
        />
      );
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
      <Container bgColor={bgColor} className='hasback-icon'>
        <ContainerInner hasBack={hasBack}>
          <IconContainer>
            <IconLeft onClick={() => navigate(-1)} />
          </IconContainer>
          <CommonText isBody={true} mg='0 0 0 12px'>
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
          <CommonText isTitle3={true}>{title}</CommonText>
          <IconContainer>{handleIcons(icon)}</IconContainer>
        </ContainerInner>
      </Container>
    );
  } else {
    return (
      <Container bgColor={bgColor}>
        <ContainerInner>
          <CommonText isTitle3={true}>{title}</CommonText>
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

  &.hasback-icon {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
    margin-bottom: 24px;
    background-color: ${colors.white};
  }
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
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: ${colors.orange500};

  cursor: pointer;
`;
