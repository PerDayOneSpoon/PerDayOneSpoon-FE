import styled from 'styled-components';
import { colors } from '../../theme/theme';
import Goal from './Goal';
import GoalEmpty from './GoalEmpty';
import char1 from '../../assets/imgs/character1.png';
import char2 from '../../assets/imgs/character2.png';
import char3 from '../../assets/imgs/character3.png';
import char4 from '../../assets/imgs/character4.png';
import char5 from '../../assets/imgs/character5.png';

const GoalList = ({ isMain }) => {
  const data = [
    {
      id: 1,
      title: '10분 독서',
      charImg: char1,
      startDate: '2022년 08월 31일',
      endDate: '2022년 09월 02일',
      time: '00:10',
      likeNum: 3,
      completion: false,
    },
    {
      id: 2,
      title: '물 마시기',
      charImg: char2,
      startDate: '2022년 08월 31일',
      endDate: '2022년 09월 02일',
      time: '00:01',
      likeNum: 6,
      completion: false,
    },
    {
      id: 3,
      title: '영단어 외우기',
      charImg: char3,
      startDate: '2022년 08월 31일',
      endDate: '2022년 09월 02일',
      time: '00:10',
      likeNum: 2,
      completion: false,
    },
    {
      id: 4,
      title: '산책',
      charImg: char4,
      startDate: '2022년 08월 31일',
      endDate: '2022년 09월 02일',
      time: '00:20',
      likeNum: 1,
      completion: false,
    },
    {
      id: 5,
      title: '아무거나',
      charImg: char5,
      startDate: '2022년 08월 31일',
      endDate: '2022년 09월 02일',
      time: '01:00',
      likeNum: 1,
      completion: false,
    },
  ];

  if (data.length === 0) {
    return <GoalEmpty />;
  }

  return (
    <Container>
      {data.map((item) => (
        <Goal key={item.id} item={item} isMain={isMain} />
      ))}
    </Container>
  );
};

export default GoalList;

const Container = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${colors.border};
`;
