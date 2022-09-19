import styled from 'styled-components';
import { colors } from '../theme/theme';
import CommonText from './elements/CommonText';

const Graph = ({ weekRateDtoList, weekStartDate, weekEndDate }) => {
  return (
    <Container>
      <CommonText
        isFootnote1={true}
        pd={'0 24px'}
        bgColor={colors.secondary}
        fc={colors.orange700}
      >
        {weekStartDate} ~ {weekEndDate}
      </CommonText>
      <GraphBox>
        {weekRateDtoList.map((day) => (
          <GraphList key={day.id}>
            <GraphBar>
              <GraphBarInner percentage={day.rate} />
            </GraphBar>
            <CommonText isFootnote1={true}>{day.dayString}</CommonText>
          </GraphList>
        ))}
      </GraphBox>
    </Container>
  );
};

export default Graph;

const Container = styled.div`
  margin-left: -16px;
  margin-right: -16px;
  margin-top: -8px;
  background-color: ${colors.secondary};
  border-radius: 0 0 16px 16px;
  overflow: hidden;

  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.06);
`;

const GraphBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.secondary};
  padding: 24px 24px 16px;
`;
const GraphList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GraphBar = styled.div`
  /* position: relative; */
  width: 20px;
  height: 80px;
  background-color: ${colors.orange100};
  margin-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const GraphBarInner = styled.div`
  width: 100%;
  height: ${({ percentage }) => `${percentage}%`};
  background-color: ${colors.primary};
  transition: all 0.3s ease-out;
  border-radius: 4px;
`;
