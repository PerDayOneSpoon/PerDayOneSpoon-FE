import styled from 'styled-components';
import CollectionBadge from './CollectionBadge';

const CollectionList = () => {
  const data = [
    {
      id: 1,
      badge: '웰컴 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 2,
      badge: '인싸 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 3,
      badge: '퐁당퐁당 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 4,
      badge: '얼리버드 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 5,
      badge: '올빼미 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 6,
      badge: '단타 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 7,
      badge: '장타 뱃지',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 8,
      badge: '뱃지 이름',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 9,
      badge: '뱃지 이름',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 10,
      badge: '뱃지 이름',
      hasBadge: false,
      date: '2022. 08. 31',
    },
    {
      id: 11,
      badge: '뱃지 이름',
      hasBadge: false,
      date: '2022. 08. 31',
    },
  ];

  return (
    <Container>
      <Title>뱃지 컬렉션</Title>
      <BadgeContainer>
        {data.map((badge) => (
          <CollectionBadge key={badge.id} badge={badge} />
        ))}
      </BadgeContainer>
    </Container>
  );
};

export default CollectionList;

const Container = styled.div`
  margin-top: 16px;
  padding-bottom: 50px;
`;

const Title = styled.h2`
  display: inline-block;
  padding-bottom: 8px;
  margin-bottom: 16px;
  line-height: 24px;
  border-bottom: 2px solid black;
`;

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;
