import styled from 'styled-components';
import { colors } from '../../theme/theme';
import emptyImg from '../../assets/imgs/character-gray.png';
import CommonText from '../elements/CommonText';

const GoalEmpty = ({ emptyText }) => {
  return (
    <Container>
      <ImgContainer>
        <EmptyImg src={emptyImg} />
      </ImgContainer>
      <CommonText isSentece2={true} fc={colors.gray500} wd='164px' lh='22px'>
        {emptyText}
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

const EmptyText = styled.p`
  width: 170px;
  font-size: 14px;
  line-height: 1.4;
  word-break: keep-all;
  text-align: center;
`;
