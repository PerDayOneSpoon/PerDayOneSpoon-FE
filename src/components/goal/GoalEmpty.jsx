import styled from 'styled-components';
import { colors } from '../../theme/theme';
import emptyImg from '../../assets/imgs/character-gray.png';
import CommonText from '../elements/CommonText';

const GoalEmpty = ({ emptyText, emptyText2 }) => {
  return (
    <Container>
      <ImgContainer>
        <EmptyImg src={emptyImg} />
      </ImgContainer>
      <CommonText isSentece2={true} fc={colors.gray500} lh='22px'>
        {emptyText}
      </CommonText>
      <CommonText isSentece2={true} fc={colors.gray500} lh='22px'>
        {emptyText2}
      </CommonText>
    </Container>
  );
};

export default GoalEmpty;

const Container = styled.div`
  width: 100%;
  height: 44vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ImgContainer = styled.div`
  width: 124px;
  height: 114px;
  margin-bottom: 30px;
`;

const EmptyImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
