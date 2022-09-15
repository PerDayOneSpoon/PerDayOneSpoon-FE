import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconHeartEmpty } from '../../assets/icons/icon-heart-empty.svg';
import { ReactComponent as IconHeartFill } from '../../assets/icons/icon-heart-fill.svg';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import useInterval from '../../hooks/useInterval';

import { useRecoilState, useRecoilValue } from 'recoil';

import { asyncGetGoal } from '../../recoil/goal';
import { goalTimeFamily } from '../../recoil/goal';

const Goal = ({ isMain, item }) => {
  const queryClient = useQueryClient();

  const [isTimer, setIsTimer] = useState(false);

  const achieveGoalMutation = useMutation(goalApi.achieveGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getGoalInfo');
      console.log('achieveGoalMutation 성공 데이터', data);
    },
    onError: (error) => {
      console.log('achieveGoalMutation 에러 데이터', error);
    },
  });

  const {
    id,
    title,
    characterUrl,
    startDate,
    endDate,
    time, //"00:10:00"
    likeNum,
    achievementCheck,
    privateCheck,
  } = item;

  // const getGoalTest = useRecoilValue(asyncGetGoal);
  // console.log('getGoalTest', getGoalTest);

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
    console.log(id, '시작 버튼 클릭!');
    setTestTime((prev) => ({ ...prev, isPlay: true }));
    // setIsPlay(true);
  };

  useEffect(() => {
    if (testTime.hh === 0 && testTime.mm === 0 && testTime.ss === 0) {
      clearInterval(startProgress);
      console.log(id, '타이머 종료!');
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

  // console.log('testTime', testTime);

  // useEffect 시에 담아주면 컴포넌트 이동할 때마다 초기화 됨. 수정 필요..
  // useEffect(() => {
  //   setTestTime({
  //     ...testTime,
  //     hh: parseInt(time.split(':')[0]),
  //     mm: parseInt(time.split(':')[1]),
  //     ss: parseInt(time.split(':')[2]),
  //   });
  // }, []);

  return (
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
            <CommonText isSubtitle1={true}>{title}</CommonText>
            <CommonText isCaption={true} fc={colors.text}>
              {startDate} - {endDate}
            </CommonText>
          </div>
        </RightContent>
        <LikeContent>
          <IconContainer>
            {isMain ? (
              <IconHeartFill onClick={(e) => e.stopPropagation()} />
            ) : (
              <IconHeartEmpty onClick={(e) => e.stopPropagation()} />
            )}
          </IconContainer>
          <CommonText isCaption={true} fc={colors.text}>
            {likeNum}
          </CommonText>
        </LikeContent>
      </Contents>
      {isMain && isTimer && (
        <TimerContainer>
          <Timer>
            <Time isCaption={true} fc={colors.text}>
              {`${HH}:${MM}:${SS} `}
            </Time>
            <ProgressBar>
              <ProgressPercentage
                percentage={percentage}
                isAchievementCheck={achievementCheck}
              />
            </ProgressBar>
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
      )}
    </Container>
  );
};

export default Goal;

const Container = styled.div`
  padding: 16px;
  background-color: ${({ isAchievementCheck }) =>
    isAchievementCheck ? '#efefef' : colors.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  cursor: pointer;

  & + & {
    margin-top: 16px;
  }
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
  margin-right: 10px;
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
  margin-bottom: 10px;
`;

const Timer = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
  margin-top: 4px;
  background-color: ${colors.inputColor};
  border-radius: 4px;
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
