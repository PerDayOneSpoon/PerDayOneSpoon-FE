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
import useInterval from '../../hooks/useInterval';

import { useRecoilState } from 'recoil';
import { goalTimeFamily } from '../../recoil/goal';
import { modalState } from '../../recoil/common';

const Goal = ({ item, handleAchiveCheck, handleGoalDelete }) => {
  const queryClient = useQueryClient();

  const [isTimer, setIsTimer] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);

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
      <GoalContainerInner>
        {achievementCheck ? (
          <IconContainer className='check-icon'>
            <IconCheck style={{ color: colors.orange500 }} />
          </IconContainer>
        ) : (
          <CheckContainer onClick={handleAchiveCheck} />
        )}

        <Container onClick={() => setIsTimer(!isTimer)}>
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
                      percentage={percentage}
                      isAchievementCheck={achievementCheck}
                    />
                  </ProgressBar>
                  <Time isFootnote2={true} fc={colors.gray500}>
                    {`${HH}:${MM}:${SS} `}
                  </Time>
                </Timer>
                <CommonButton
                  handleButtonClick={(e) => {
                    e.stopPropagation();
                    handleStartCilck();
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
