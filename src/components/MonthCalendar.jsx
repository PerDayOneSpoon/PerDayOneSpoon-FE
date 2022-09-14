import { useState, useEffect } from 'react';
import { ReactComponent as IconLeft } from '../assets/icons/icon-left.svg';
import { ReactComponent as IconRight } from '../assets/icons/icon-right.svg';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { colors } from '../theme/theme';
import { useRef } from 'react';

const MonthCalendar = ({
  dateValue,
  handleChangeDate,
  handleGetStartEndDate,
}) => {
  const data = ['1', '2', '3', '4', '5'];

  const response = [
    {
      friendsData: [
        {
          id: 1,
          name: 'aaa',
          profileImg: '',
        },
        {
          id: 2,
          name: 'bbb',
          profileImg: '',
        },
        {
          id: 3,
          name: 'ccc',
          profileImg: '',
        },
        {
          id: 4,
          name: 'ddd',
          profileImg: '',
        },
      ],
    },
    {
      calendarData: [
        {
          id: 1,
          date: '2022년 09월 22일',
          goalColor: ['#fbe5a5', '#f29bca', '#bbdcad'],
        },
        {
          id: 2,
          date: '2022년 09월 25일',
          goalColor: ['#dbb4f4', '#b4d7fc'],
        },
        {
          id: 3,
          date: '2022년 09월 26일',
          goalColor: ['#dbb4f4', '#b4d7fc'],
        },
        {
          id: 4,
          date: '2022년 09월 27일',
          goalColor: ['#dbb4f4', '#b4d7fc', '#fbe5a5'],
        },
      ],
    },
    {
      todayGoalData: [
        {
          id: 1,
          title: '9.13 습관 추가',
          startDate: '2022년 09월 13일',
          endDate: '2022년 09월 16일',
          characterImg: '',
          achievementCheck: false,
        },
      ],
    },
  ];

  const tileContent = ({ date, view }) => {
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
        value={dateValue}
        tileContent={tileContent}
        onChange={handleChangeDate}
        view={'month'}
        calendarType={'Hebrew'}
        nextLabel={<IconRight />}
        prevLabel={<IconLeft />}
        onActiveStartDateChange={handleGetStartEndDate}
        formatDay={(locale, date) => dayjs(date).format('DD')}
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

  .react-calendar__tile--now {
    background-color: transparent;
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
