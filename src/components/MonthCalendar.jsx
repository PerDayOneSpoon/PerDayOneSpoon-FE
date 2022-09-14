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
  monthCalenderDtoList,
}) => {
  const data = ['1', '2', '3', '4', '5'];
  const [mark, setMark] = useState([]);
  const days = monthCalenderDtoList.map((item) => item.currentDate);

  // console.log('monthCalenderDtoList', monthCalenderDtoList);

  // const day = monthCalenderDtoList.map((item) => item.currentDate);
  // const colors = monthCalenderDtoList.map((item) => item.charactorColorlist);

  // console.log(colors);

  // const tileContent = ({ date, view }) => {
  //   if (day.find((x) => x === dayjs(date).format('YYYY년 MM월 DD일'))) {
  //     return (
  //       <MarkContainer>
  //         {monthCalenderDtoList.map((item) => (
  //           <Mark key={item.id} markColor={item.charactorColorlist} />
  //         ))}
  //       </MarkContainer>
  //     );
  //   }
  // };

  // const tileContent = ({ date, view }) => {
  //   // let html = [];

  //   if (day.find((x) => x === dayjs(date).format('YYYY년 MM월 DD일'))) {
  //     // html.push(<Mark key={day} />);
  //     return (
  //       // <MarkContainer>
  //       //   <Mark />
  //       // </MarkContainer>

  //       colors.map((color, i) => (
  //         <MarkContainer>
  //           <Mark key={i} />
  //         </MarkContainer>
  //       ))
  //     );
  //   }

  //   // return (
  //   //   <>
  //   //     <MarkContainer>{html}</MarkContainer>
  //   //   </>
  //   // );
  // };

  return (
    <Container>
      <CutomCalendar
        value={dateValue}
        // tileContent={tileContent}
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
  /* background-color: ${({ bg }) => bg}; */

  & + & {
    margin-left: 3px;
  }
`;
