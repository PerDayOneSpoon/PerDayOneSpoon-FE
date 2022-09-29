import styled from 'styled-components';
import { colors } from '../../theme/theme';
import badgeTestImg from '../../assets/imgs/character-question-mark.png';
import CommonText from '../elements/CommonText';

const CollectionBadge = ({ badge, handleBadgeClick }) => {
  return (
    <Container onClick={() => handleBadgeClick(badge.badgeNumber)}>
      <BadgeImgContainer>
        <BadgeImg src={badge.badgeUrl} />
      </BadgeImgContainer>
      <CommonText isCallout={true}>{badge.badgeName}</CommonText>
      {/* <CommonText isCallout={true} fc={colors.text}>
        {badge.date}
      </CommonText> */}
    </Container>
  );
};

export default CollectionBadge;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;

const BadgeImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BadgeImg = styled.img`
  width: 90%;
  height: 90%;
`;
