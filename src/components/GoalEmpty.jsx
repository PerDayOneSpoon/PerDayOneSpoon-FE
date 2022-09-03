import styled from 'styled-components';

const GoalEmpty = () => {
  return (
    <Container>
      <ImgContainer>
        <EmptyImg />
      </ImgContainer>
      <EmptyText>추가하신 목표가 없습니다 목표를 추가해 주세요!</EmptyText>
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
`;

const ImgContainer = styled.div`
  width: 170px;
  height: 122px;
  margin-bottom: 30px;
  background-color: #eee;
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
