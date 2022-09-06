import styled from 'styled-components';

const CollectionBadge = () => {
  return (
    <Container>
      <BadgeImg />
      <BadgeName>뱃지 이름</BadgeName>
      <BadgeDate>2022. 08. 31</BadgeDate>
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

const BadgeImg = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 20px;
  background-color: #eee;
  margin-bottom: 6px;
`;
const BadgeName = styled.div``;
const BadgeDate = styled.div``;
