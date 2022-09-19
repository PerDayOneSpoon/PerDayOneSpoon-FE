import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as IconTrash } from '../../assets/icons/icon-trash.svg';
import { ReactComponent as IconLock } from '../../assets/icons/icon-lock.svg';
import { ReactComponent as IconUnlock } from '../../assets/icons/icon-unlock.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import useInterval from '../../hooks/useInterval';

import { useRecoilState } from 'recoil';
import { goalTimeFamily } from '../../recoil/goal';

const Goal = ({ item }) => {
  const queryClient = useQueryClient();

  const [isTimer, setIsTimer] = useState(false);

  const deleteGoalMutation = useMutation(goalApi.deleteGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getGoalInfo');
    },
  });

  const achieveGoalMutation = useMutation(goalApi.achieveGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getGoalInfo');
    },
    onError: (error) => {},
  });

  const changePrivateGoalMutaion = useMutation(goalApi.changePrivateGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getGoalInfo');
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

  let totalTime = 0;

  time.split(':').forEach((time, i) => {
    if (i === 0) totalTime += parseInt(time) * 60 * 60;
    if (i === 1) totalTime += parseInt(time) * 60;
    if (i === 2) totalTime += parseInt(time);
  });

  const [testTime, setTestTime] = useRecoilState(goalTimeFamily(id));
  const [timerInterval, setTimerInterval] = useState(0);

  const percentage =
    Math.floor((testTime.currentTime / totalTime) * 10000) / 100;

  // 화면에 보여질 부분
  const HH = String(testTime.hh).padStart(2, '0');
  const MM = String(testTime.mm).padStart(2, '0');
  const SS = String(testTime.ss).padStart(2, '0');

  const startProgress = () => {
    // testTime.isPlay && setCurrentTime((s) => s + 1);
    testTime.isPlay &&
      setTestTime((prev) => ({ ...prev, currentTime: prev.currentTime + 1 }));

    if (testTime.ss > 0) {
      setTestTime((prev) => ({ ...prev, ss: prev.ss - 1 }));
    }

    if (testTime.ss === 0) {
      if (testTime.mm === 0) {
        if (testTime.hh === 0) {
          // setIsPlay(false);
          setTestTime((prev) => ({ ...prev, isPlay: false }));
        } else {
          setTestTime((prev) => ({ ...prev, hh: prev.hh - 1 }));
          setTestTime((prev) => ({ ...prev, mm: 59 }));
          setTestTime((prev) => ({ ...prev, ss: 59 }));
        }
      } else {
        setTestTime((prev) => ({ ...prev, mm: prev.mm - 1 }));
        setTestTime((prev) => ({ ...prev, ss: 59 }));
      }
    }
  };

  const customInterval = useInterval(
    () => {
      startProgress();
    },
    testTime.isPlay ? 1000 : null
  );

  const handleStartCilck = () => {
    setTestTime((prev) => ({ ...prev, isPlay: true }));
    // setIsPlay(true);
  };

  const handleLockClick = (check) => {
    changePrivateGoalMutaion.mutate({
      goalFlag: goalFlag,
      privateCheck: !check,
    });
  };

  const handleGoalDelete = (deleteId) => {
    if (
      window.confirm('모든 날짜의 해당 습관이 삭제됩니다. 삭제하시겠습니까?')
    ) {
      deleteGoalMutation.mutate({ goalFlag: deleteId });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (testTime.hh === 0 && testTime.mm === 0 && testTime.ss === 0) {
      clearInterval(startProgress);
      const data = {
        goalId: id,
        achivement: true,
      };
      achieveGoalMutation.mutate(data);
    }
  }, [testTime.hh, testTime.mm, testTime.ss]);

  useEffect(() => {
    if (testTime.isPlay) {
      setTimerInterval(customInterval);
    }
  }, [testTime.isPlay]);

  return (
    <GoalContainer isTimer={isTimer}>
      <Container
        onClick={() => setIsTimer(!isTimer)}
        isAchievementCheck={achievementCheck}
      >
        <Contents>
          <RightContent>
            <ChracterContainer>
              <Character src={characterUrl} alt='캐릭터 이미지' />
            </ChracterContainer>

            <div>
              <CommonText isCallout={true}>{title}</CommonText>
              <CustomText isFootnote2={true} fc={colors.text}>
                <IconContainer className='calendar-icon'>
                  <IconCalendar />
                </IconContainer>
                {startDate} - {endDate}
              </CustomText>
            </div>
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
                    percentage={percentage}
                    isAchievementCheck={achievementCheck}
                  />
                </ProgressBar>
                <Time isFootnote2={true} fc={colors.gray500}>
                  {`${HH}:${MM}:${SS} `}
                </Time>
              </Timer>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartCilck();
                }}
                isAchievementCheck={achievementCheck}
                disabled={achievementCheck}
              >
                시작
              </Button>
            </TimerContainer>
          </>
        )}
      </Container>
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
        margin-bottom: 54px;
      `}
  }
`;

const Container = styled.div`
  padding: 16px;
  background-color: ${({ isAchievementCheck }) =>
    isAchievementCheck ? '#efefef' : colors.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightContent = styled.div`
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;

  &.trash-icon {
    width: 20px;
    height: 20px;
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
  align-items: flex-end;
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

const Button = styled.button`
  width: 50px;
  margin-bottom: -2px;
  margin-left: 16px;
  border: none;
  outline: none;
  padding: 2px 4px;
  border-radius: 4px;
  color: ${colors.white};
  background-color: ${({ isAchievementCheck }) =>
    isAchievementCheck ? '#ccc' : colors.primary};
  font-size: 12px;

  cursor: pointer;
`;

const CustomText = styled(CommonText)`
  margin-top: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${colors.gray50};
  display: flex;
  align-items: stretch;
  word-break: keep-all;
`;
