import { ReactComponent as IconLeft } from '../assets/icons/icon-left.svg';
import { ReactComponent as IconRight } from '../assets/icons/icon-right.svg';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { colors } from '../theme/theme';

const MonthCalendar = ({
  dateValue,
  monthCalenderDtoList,
  handleGetMonth,
  handleChangeDate,
}) => {
  const dates = monthCalenderDtoList.map((item) => item.currentDate);

  const tileContent = ({ date, view }) => {
    if (dates.find((x) => x === dayjs(date).format('YYYY년 MM월 DD일'))) {
      const findDate = monthCalenderDtoList.find(
        (val) => val.currentDate === dayjs(date).format('YYYY년 MM월 DD일')
      );

      return (
        <MarkContainer>
          {findDate.charactorColorlist.map((color, i) => (
            <Mark bg={color} key={i} />
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
        onActiveStartDateChange={handleGetMonth}
        view={'month'}
        calendarType={'Hebrew'}
        nextLabel={<IconRight />}
        prevLabel={<IconLeft />}
        // onActiveStartDateChange={handleGetMonth}
        formatDay={(locale, date) => dayjs(date).format('D')}
      />
    </Container>
  );
};

export default MonthCalendar;

const Container = styled.div`
  margin-left: -16px;
  margin-right: -16px;
  padding: 16px 24px;
  background-color: ${colors.white};
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.06);
`;

const CutomCalendar = styled(Calendar)`
  button {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
  }

  &.react-calendar {
    width: 100%;
    border: none;
    background-color: ${colors.bgColor};
    padding-bottom: 16px;
  }

  .react-calendar__viewContainer {
    margin-left: -16px;
    margin-right: -16px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${colors.black};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${colors.gray400} !important;
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
      aspect-ratio: 1/1;
      background-color: ${colors.orange500};
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
    font-size: 20px;
    line-height: 25px;
    font-weight: 500;
    padding: 0;
  }

  .react-calendar__month-view__weekdays {
    font-size: 15px;
    line-height: 24px;
    font-weight: 400;
    color: ${colors.gray500};
  }

  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    min-width: unset;
    border: 1px solid #d4d6d9;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-calendar__navigation__prev-button {
    right: 46px;
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
    font-size: 15px;
    line-height: 24px;
    font-weight: 400;
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
  /* background-color: orange; */
  background-color: ${({ bg }) => (bg === '#fbe5a5' ? 'orange' : bg)};

  & + & {
    margin-left: 3px;
  }
`;
