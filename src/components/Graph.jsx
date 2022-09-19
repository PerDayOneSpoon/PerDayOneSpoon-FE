import styled from 'styled-components';
import { colors } from '../theme/theme';
import CommonText from './elements/CommonText';

const Graph = ({ weekRateDtoList, weekStartDate, weekEndDate }) => {
  return (
    <Container>
      <CommonText
        isCaption={true}
        mg={'0 0 8px 0'}
        pd={'0 16px'}
        bgColor={colors.secondary}
        fc={colors.text}
      >
        {weekStartDate} ~ {weekEndDate}
      </CommonText>
      <GraphBox>
        {weekRateDtoList.map((day) => (
          <GraphList key={day.id}>
            <GraphBar percentage={day.rate} />
            <CommonText isCaption={true}>{day.dayString}</CommonText>
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
  margin-top: -10px;
  background-color: ${colors.secondary};
  border-radius: 0 0 16px 16px;
  overflow: hidden;

  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.06);
`;

const Date = styled.div`
  /* margin-bottom: 8px; */
`;

const GraphBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.secondary};
  padding: 16px 32px;
`;
const GraphList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GraphBar = styled.div`
  position: relative;
  width: 20px;
  height: 80px;
  background-color: ${colors.white};
  margin-bottom: 8px;
  border-radius: 6px;
  overflow: hidden;

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: ${({ percentage }) => `${percentage}%`};
    background-color: ${colors.primary};
  }
`;
