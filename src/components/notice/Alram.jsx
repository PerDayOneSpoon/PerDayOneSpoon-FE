import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { ReactComponent as IconClose } from '../../assets/icons/icon-close.svg';
import { ReactComponent as IconFollower } from '../../assets/icons/icon-notice-follower.svg';
import { ReactComponent as IconNotice } from '../../assets/icons/icon-notice.svg';
import { ReactComponent as IconHeart } from '../../assets/icons/icon-notice-heart.svg';
import { ReactComponent as IconBadge } from '../../assets/icons/icon-notice-badge.svg';
import { ReactComponent as IconComment } from '../../assets/icons/icon-notice-comment.svg';

const Alram = ({ data, handleDeleteNotice }) => {
  const handleAlramText = (type) => {
    switch (type) {
      case 'Complete':
        return { text: '습관', icon: <IconNotice /> };
      case 'Heart':
        return { text: '좋아요', icon: <IconHeart /> };
      case 'Follower':
        return { text: '친구', icon: <IconFollower /> };
      case 'Badge':
        return { text: '뱃지', icon: <IconBadge /> };
      case 'Comment':
        return { text: '댓글', icon: <IconComment /> };
      default:
        return;
    }
  };

  const handleTime = (createdAt) => {
    const today = new Date();
    const timeValue = new Date(createdAt);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  };

  return (
    <Container>
      <div>
        <AlramContainerInner>
          <IconContainer>
            {handleAlramText(data.notificationType).icon}
          </IconContainer>
          <TextContainer>
            <CommonText
              isFootnote1={true}
              fw='700'
              fc={colors.gray700}
              mg='0 0 4px 0'
            >
              {handleAlramText(data.notificationType).text} 알림
            </CommonText>
            <CommonText isSentence3={true}>{data.message}</CommonText>
          </TextContainer>
        </AlramContainerInner>
      </div>
      <RightContent>
        <CloseIconContainer onClick={() => handleDeleteNotice(data.id)}>
          <IconClose />
        </CloseIconContainer>
        <CommonText isFootnote2={true} fc={colors.gray500}>
          {handleTime(data.realTime)}
        </CommonText>
      </RightContent>
    </Container>
  );
};

export default Alram;

const Container = styled.div`
  height: 100%;
  border-top: 1px solid ${colors.gray300};
  margin-left: -16px;
  margin-right: -16px;
  padding: 16px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  &:last-child {
    border-bottom: 1px solid ${colors.gray300};
  }
`;
const AlramContainerInner = styled.div`
  display: flex;
  align-items: center;
`;
const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray200};
  margin-right: 16px;
  flex-shrink: 0;
  flex-basis: auto;
`;
const TextContainer = styled.div``;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 60px;
  flex-shrink: 0;
  flex-basis: auto;
`;
const CloseIconContainer = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;
