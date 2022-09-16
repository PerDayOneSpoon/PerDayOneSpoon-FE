import styled from 'styled-components';
import { colors } from '../../theme/theme';
import badgeTestImg from '../../assets/imgs/character-question-mark.png';
import CommonText from '../elements/CommonText';

const CollectionBadge = ({ badge }) => {
  return (
    <Container>
      <BadgeImgContainer>
        <BadgeImg src={badgeTestImg} />
      </BadgeImgContainer>
      <CommonText isSubtitle1={true}>{badge.badge}</CommonText>
      <CommonText isCaption={true} fc={colors.text}>
        {badge.date}
      </CommonText>
    </Container>
  );
};

export default CollectionBadge;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BadgeImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 20px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BadgeImg = styled.img`
  width: 80%;
  height: 80%;
`;
