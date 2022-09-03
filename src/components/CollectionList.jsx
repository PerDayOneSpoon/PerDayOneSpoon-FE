import styled from 'styled-components';
import CollectionBadge from './CollectionBadge';

const CollectionList = () => {
  const data = [
    {
      id: 1,
      badge: 'badge1',
      hasBadge: false,
    },
    {
      id: 2,
      badge: 'badge2',
      hasBadge: false,
    },
    {
      id: 3,
      badge: 'badge3',
      hasBadge: false,
    },
    {
      id: 4,
      badge: 'badge4',
      hasBadge: false,
    },
    {
      id: 5,
      badge: 'badge5',
      hasBadge: false,
    },
    {
      id: 6,
      badge: 'badge6',
      hasBadge: false,
    },
    {
      id: 7,
      badge: 'badge7',
      hasBadge: false,
    },
    {
      id: 8,
      badge: 'badge8',
      hasBadge: false,
    },
    {
      id: 9,
      badge: 'badge9',
      hasBadge: false,
    },
    {
      id: 10,
      badge: 'badge10',
      hasBadge: false,
    },
    {
      id: 11,
      badge: 'badge11',
      hasBadge: false,
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
  gap: 30px;
`;
