import { useState } from 'react';
import { ReactComponent as IconLeft } from '../assets/icons/icon-left.svg';
import { ReactComponent as IconRight } from '../assets/icons/icon-right.svg';
import Calendar from 'react-calendar';
import moment from 'moment';
import styled, { css } from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const MonthCalendar = ({ isMain }) => {
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
        tileContent={isMain ? tileContent : null}
        view={'month'}
        calendarType={'Hebrew'}
        nextLabel={<IconRight />}
        prevLabel={<IconLeft />}
        showFixedNumberOfWeeks={true}
        formatDay={(locale, date) => moment(date).format('DD')}
        isMain={isMain}
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
    margin-bottom: ${({ isMain }) => (isMain ? '16px' : null)};
  }

  .react-calendar__tile--active {
    border-radius: 50%;
  }

  .react-calendar__month-view__days button {
    height: unset !important;
    aspect-ratio: 1/1;
  }

  .react-calendar__navigation {
    position: relative;
    align-items: center;
    justify-content: ${({ isMain }) => (isMain ? 'flex-start' : 'center')};

    button:hover,
    button:focus {
      background-color: transparent;
    }
  }
  .react-calendar__navigation__label {
    flex-grow: initial !important;
    font-size: 20px;
    padding-top: 0;
    padding: 0 ${({ isMain }) => (!isMain ? '24px' : null)};
  }

  ${({ isMain }) =>
    isMain &&
    css`
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
    `}

  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    min-width: 24px;
    height: 24px;
    padding: 0;
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
  bottom: 12px;
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
