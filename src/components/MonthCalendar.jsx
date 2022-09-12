import { useState } from 'react';
import { ReactComponent as IconLeft } from '../assets/icons/icon-left.svg';
import { ReactComponent as IconRight } from '../assets/icons/icon-right.svg';
import Calendar from 'react-calendar';
import moment from 'moment';
import styled, { css } from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { colors } from '../theme/theme';

const MonthCalendar = () => {
  const [value, setValue] = useState(new Date());
  const data = ['1', '2', '3', '4', '5'];

  // const response = {
  //   date: '2022년 09월 22일',
  //   characterId: 1 -> color: '#ffeeee'
  // }

  const tileContent = ({ date, view }) => {
    // date === response.date
    if (date.getDay() === 6) {
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
        nextLabel={<IconRight />}
        prevLabel={<IconLeft />}
        showFixedNumberOfWeeks={true}
        formatDay={(locale, date) => moment(date).format('DD')}
      />
    </Container>
  );
};

export default MonthCalendar;

const Container = styled.div`
  /* height: 340px; */
`;

const CutomCalendar = styled(Calendar)`
  &.react-calendar {
    width: 100%;
    border: none;
    background-color: ${colors.bgColor};
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.border};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    abbr {
      /* display: inline-block; */
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .react-calendar__tile--active {
    border-radius: 50%;
    background: transparent;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;

    abbr {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: ${colors.primary};
      color: white;
      border-radius: 50%;
      vertical-align: middle;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .react-calendar__month-view__days button {
    height: unset !important;
    aspect-ratio: 1/1;
  }

  .react-calendar__navigation {
    position: relative;
    align-items: center;
    justify-content: flex-start;

    button:hover,
    button:focus {
      background-color: transparent;
    }
  }
  .react-calendar__navigation__label {
    flex-grow: initial !important;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.15px;
    font-weight: 500;
    padding-top: 0;
  }

  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .react-calendar__navigation__prev-button {
    right: 32px;
  }
  .react-calendar__navigation__next-button {
    right: 0;
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
