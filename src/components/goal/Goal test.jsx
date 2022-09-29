import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as IconTrash } from '../../assets/icons/icon-trash.svg';
import { ReactComponent as IconLock } from '../../assets/icons/icon-lock.svg';
import { ReactComponent as IconUnlock } from '../../assets/icons/icon-unlock.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { ReactComponent as IconCheck } from '../../assets/icons/icon-check.svg';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import CommonButton from '../elements/CommonButton';
import { useRecoilState } from 'recoil';
import { goalTimeFamily } from '../../recoil/goal';
import { goalTimeId } from '../../recoil/goal';
import { timeToString } from '../../utils/timeToStringt';
import { stringToTime } from '../../utils/stringToTime';
import useInterval from '../../hooks/useInterval';
import { goalTimerSelectorFamily } from '../../recoil/goal';

const Goal = ({
  item,
  handleAchiveCheck,
  handleGoalDelete,
  // handleStartCilck,
}) => {
  const queryClient = useQueryClient();

  const [isTimer, setIsTimer] = useState(false);

  const [timerInterval, setTimerInterval] = useState(0);

  const [clickedGoalId, setClickedGoalId] = useRecoilState(goalTimeId);

  const achieveGoalMutation = useMutation(goalApi.achieveGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['goalInfo']);
      queryClient.invalidateQueries(['peopleSearchDate']);
      queryClient.invalidateQueries(['personGoal']);
    },
    onError: (error) => {},
  });

  const changePrivateGoalMutaion = useMutation(goalApi.changePrivateGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['goalInfo']);
      queryClient.invalidateQueries(['peopleSearchDate']);
      queryClient.invalidateQueries(['peopleSearchMonth']);
      queryClient.invalidateQueries(['personGoal']);
    },
    onError: (error) => {},
  });

  const {
    id,
    title,
    characterUrl,
    startDate,
    endDate,
    time,
    achievementCheck,
    privateCheck,
    goalFlag,
  } = item;

  const [goalTimer, setGoalTimer] = useRecoilState(goalTimerSelectorFamily(id));
  console.log('goalTimer!!!', goalTimer);

  // useInterval(
  //   JSON.parse(localStorage.getItem(`timer${id}`))?.id,
  //   JSON.parse(localStorage.getItem(`timer${id}`))?.isPlay,
  //   JSON.parse(localStorage.getItem(`timer${id}`))?.displayTime
  // );

  // console.log(JSON.parse(localStorage.getItem(`timer${id}`)).id);

  // const [testTime, setTestTime] = useRecoilState(goalTimeFamily(id));
  // console.log(testTime);

  // const percentage =
  //   Math.floor((testTime.currentTime / testTime.totalTime) * 10000) / 100;

  const startProgress = () => {
    // testTime.isPlay && setCurrentTime((s) => s + 1);
    // goalTimer.isPlay &&
    //   setGoalTimer((prev) => ({ ...prev, displayTime: prev.displayTime - 1 }));
    // if (testTime.ss > 0) {
    //   setTestTime((prev) => ({ ...prev, ss: prev.ss - 1 }));
    // }
    // if (testTime.ss === 0) {
    //   if (testTime.mm === 0) {
    //     if (testTime.hh === 0) {
    //       // setIsPlay(false);
    //       setTestTime((prev) => ({ ...prev, isPlay: false }));
    //     } else {
    //       setTestTime((prev) => ({ ...prev, hh: prev.hh - 1 }));
    //       setTestTime((prev) => ({ ...prev, mm: 59 }));
    //       setTestTime((prev) => ({ ...prev, ss: 59 }));
    //     }
    //   } else {
    //     setTestTime((prev) => ({ ...prev, mm: prev.mm - 1 }));
    //     setTestTime((prev) => ({ ...prev, ss: 59 }));
    //   }
    // }
  };

  const handleLockClick = (check) => {
    changePrivateGoalMutaion.mutate({
      goalFlag: goalFlag,
      privateCheck: !check,
    });
  };

  // const customInterval = useInterval(
  //   () => {
  //     // setGoalTimer((prev) => ({ ...prev, displayTime: prev.displayTime - 1 }));
  //     startProgress();
  //   },
  //   goalTimer.isPlay ? 1000 : null
  // );

  // useEffect(() => {
  //   if (goalTimer.isPlay) {
  //     setTimerInterval(customInterval);
  //   }
  // }, [goalTimer.isPlay]);

  const handleStartClick = () => {
    setGoalTimer((prev) => {
      return {
        ...prev,
        isPlay: true,
        totalTime: stringToTime(time),
        displayTime: stringToTime(time) - 1,
      };
    });
  };

  // const handleStartCilck = (id) => {
  //   const data = JSON.parse(localStorage.getItem(`timer${id}`));
  //   const newData = { ...data, isPlay: true };

  //   localStorage.setItem(`timer${id}`, JSON.stringify(newData));
  // };

  // const handleLocalStorage = () => {
  //   const value = {
  //     id: id,
  //     totalTime: stringToTime(time),
  //     displayTime: stringToTime(time),
  //     currentTime: 0,
  //     isPlay: false,
  //     isDone: achievementCheck,
  //   };
  //   localStorage.setItem(`timer${id}`, JSON.stringify(value));
  // };

  // console.log('goalTimer!!', goalTimer);

  return (
    <GoalContainer isTimer={isTimer}>
      <GoalContainerInner>
        {achievementCheck ? (
          <IconContainer className='check-icon'>
            <IconCheck style={{ color: colors.orange500 }} />
          </IconContainer>
        ) : (
          <CheckContainer onClick={handleAchiveCheck} />
        )}

        <Container
          onClick={() => {
            setIsTimer(!isTimer);
            // handleLocalStorage();
            // setClickedGoalId(id);
            // console.log('골 컴포넌트 testTime', testTime);
          }}
        >
          <Contents>
            <RightContent>
              <ChracterContainer>
                <Character src={characterUrl} alt='캐릭터 이미지' />
              </ChracterContainer>

              <TextBox>
                <CommonText isCallout={true}>{title}</CommonText>
                <DateBox>
                  <IconContainer className='calendar-icon'>
                    <IconCalendar />
                  </IconContainer>
                  <CommonText isFootnote2={true} fc={colors.gray500}>
                    {startDate} ~ {endDate}
                  </CommonText>
                </DateBox>
              </TextBox>
            </RightContent>
            <LikeContent>
              <IconContainer>
                {privateCheck ? (
                  <IconLock
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLockClick(privateCheck);
                    }}
                  />
                ) : (
                  <IconUnlock
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLockClick(privateCheck);
                    }}
                  />
                )}
              </IconContainer>
            </LikeContent>
          </Contents>
          {isTimer && (
            <>
              <TimerContainer>
                <Timer>
                  <ProgressBar>
                    <ProgressPercentage
                      // percentage={percentage}
                      isAchievementCheck={achievementCheck}
                    />
                  </ProgressBar>
                  <Time isFootnote2={true} fc={colors.gray500}>
                    {/* {timeToString(
                      JSON.parse(localStorage.getItem(`timer${id}`)).displayTime
                    )} */}
                    {/* {goalTimer.isPlay
                      ? timeToString(goalTimer.displayTime)
                      : time} */}
                  </Time>
                </Timer>
                <CommonButton
                  handleButtonClick={(e) => {
                    e.stopPropagation();
                    setClickedGoalId(id);

                    handleStartClick();
                  }}
                  wd='50px'
                  mg='-4px 0 0 16px'
                  pd='6px 4px'
                  bdrs='20px'
                  bd='none'
                  bg={achievementCheck ? '#ccc' : colors.primary}
                  fc={colors.white}
                  fz='12px'
                  lh='16px'
                  text={achievementCheck ? '완료' : '시작'}
                  flexBasis='50px'
                  disabled={achievementCheck}
                ></CommonButton>
              </TimerContainer>
            </>
          )}
        </Container>
      </GoalContainerInner>
      {isTimer && (
        <TrashIconContainer>
          <IconContainer
            className='trash-icon'
            onClick={() => handleGoalDelete(goalFlag)}
          >
            <IconTrash />
          </IconContainer>
        </TrashIconContainer>
      )}
    </GoalContainer>
  );
};

export default Goal;

const GoalContainer = styled.div`
  & + & {
    margin-top: 16px;
  }

  :last-child {
    ${({ isTimer }) =>
      isTimer &&
      css`
        margin-bottom: 40px;
      `}
  }
`;

const GoalContainerInner = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  background-color: ${colors.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const ChracterContainer = styled.div`
  min-width: 56px;
  max-width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
`;

const Character = styled.img`
  width: 100%;
  object-fit: cover;
`;

const LikeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;

  &.check-icon {
    margin-right: 8px;
  }

  &.trash-icon {
    margin: 0 16px;
    cursor: pointer;
  }

  &.calendar-icon {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    display: inline-block;
    flex-basis: 20px;

    svg {
      width: 100%;
      height: 100%;
      color: ${colors.gray300};
    }
  }
`;

const TrashIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  svg {
    width: 100%;
    color: ${colors.danger};
  }
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 16px;
`;

const Time = styled(CommonText)`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Timer = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
  background-color: ${colors.gray100};
  border-radius: 30px;
  overflow: hidden;
`;

const ProgressPercentage = styled.div.attrs((props) => ({
  style: {
    width: props.percentage <= 100 ? `${props.percentage}%` : '100%',
  },
  style: {
    width: props.isAchievementCheck ? '100%' : `${props.percentage}%`,
  },
}))`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 30px;
  background-color: ${({ isAchievementCheck }) =>
    isAchievementCheck ? '#ccc' : colors.primary};
  transition: all 0.2s linear;
`;

const TextBox = styled.div`
  word-break: break-all;
  width: 100%;
`;

const DateBox = styled.div`
  width: 100%;
  margin-top: 8px;
  /* padding: 4px;
  border-radius: 4px;
  background-color: ${colors.gray50}; */
  display: flex;
  align-items: stretch;
  word-break: keep-all;
`;

const CheckContainer = styled.div`
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  box-sizing: border-box;
  margin: 2px 10px 2px 2px;
  border-radius: 50%;
  border: 2px solid ${colors.gray300};
`;
