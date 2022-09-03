import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const MonthCalendar = () => {
  const [value, setValue] = useState(new Date());
  const data = ['1', '2', '3', '4', '5'];

  const tileContent = ({ date, view }) => {
    if (view === 'month' && date.getDay() === 0) {
      return (
        <MarkContainer>
          {data.map((item) => (
            <Mark key={item} />
          ))}
        </MarkContainer>
      );
    }
  };

  return (
    <Container>
      <CutomCalendar
        value={value}
        tileContent={tileContent}
        view={'month'}
        calendarType={'Hebrew'}
        showFixedNumberOfWeeks={true}
        formatDay={(locale, date) => moment(date).format('DD')}
      />
    </Container>
  );
};

export default MonthCalendar;

const Container = styled.div`
  height: 340px;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

const CutomCalendar = styled(Calendar)`
  &.react-calendar {
    width: 100%;
    border: none;
  }

  .react-calendar__navigation {
    justify-content: space-evenly;
  }
  .react-calendar__navigation__label {
    flex-grow: initial !important;
  }
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__month-view__days button {
    position: relative;
    height: 44px;
  }
`;

const MarkContainer = styled.div`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Mark = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: orange;

  & + & {
    margin-left: 3px;
  }
`;
