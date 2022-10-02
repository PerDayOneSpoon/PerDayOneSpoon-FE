import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { realTimeNoticeState } from '../recoil/realTimeData';
import Alram from './notice/Alram';
import GoalEmpty from '../components/goal/GoalEmpty';
import { useEffect } from 'react';

const Notice = () => {
  const [noticeData, setNoticeData] = useRecoilState(realTimeNoticeState);

  const handleDeleteNotice = (id) => {
    const newData = noticeData.filter((notice) => notice.id !== id);
    setNoticeData(newData);
  };

  useEffect(() => {}, [noticeData]);

  return (
    <Container>
      {noticeData.length === 0 ? (
        <GoalEmpty emptyText='알림이 없습니다.' />
      ) : (
        noticeData?.map((item) => (
          <Alram
            key={item.id}
            data={item}
            handleDeleteNotice={(id) => handleDeleteNotice(id)}
          />
        ))
      )}
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  margin-top: -24px;
`;
