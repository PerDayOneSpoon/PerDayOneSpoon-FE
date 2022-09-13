import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconHeartEmpty } from '../../assets/icons/icon-heart-empty.svg';
import { ReactComponent as IconHeartFill } from '../../assets/icons/icon-heart-fill.svg';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import useInterval from '../../hooks/useInterval';

const Goal = ({ isMain, item }) => {
  const [isTimer, setIsTimer] = useState(false);

  const {
    id,
    title,
    characterId,
    startDate,
    endDate,
    time, //"00:10:00"
    likeNum,
    achievementCheck,
    privateCheck,
  } = item;

  let totalTime = 0;

  time.split(':').forEach((time, i) => {
    if (i === 0) totalTime += parseInt(time) * 60 * 60;
    if (i === 1) totalTime += parseInt(time) * 60;
    if (i === 2) totalTime += parseInt(time);
  });

  const [hh, setHh] = useState(parseInt(time.split(':')[0]));
  const [mm, setMm] = useState(parseInt(time.split(':')[1]));
  const [ss, setSs] = useState(parseInt(time.split(':')[2]));
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [timerInterval, setTimerInterval] = useState(0);

  const percentage = Math.floor((currentTime / totalTime) * 10000) / 100;

  // 화면에 보여질 부분
  const HH = String(hh).padStart(2, '0');
  const MM = String(mm).padStart(2, '0');
  const SS = String(ss).padStart(2, '0');

  const startProgress = () => {
    isPlay && setCurrentTime((s) => s + 1);

    if (ss > 0) {
      setSs((s) => s - 1);
    }

    if (ss === 0) {
      if (mm === 0) {
        if (hh === 0) {
          setIsPlay(false);
        } else {
          setHh((h) => h - 1);
          setMm(59);
          setSs(59);
        }
      } else {
        setMm((m) => m - 1);
        setSs(59);
      }
    }
  };

  const customInterval = useInterval(
    () => {
      startProgress();
    },
    isPlay ? 1000 : null
  );

  const handleStartCilck = () => {
    console.log(id, '시작 버튼 클릭!');
    setIsPlay(true);
  };

  useEffect(() => {
    if (hh === 0 && mm === 0 && ss === 0) {
      clearInterval(startProgress);
      console.log(id, '타이머 종료!');
    }
  }, [hh, mm, ss]);

  useEffect(() => {
    if (isPlay) {
      setTimerInterval(customInterval);
    }
  }, [isPlay]);

  return (
    <Container
      onClick={() => setIsTimer(!isTimer)}
      isAchievementCheck={achievementCheck}
    >
      <Contents>
        <RightContent>
          <ChracterContainer>
            {/* <Character src={charImg} /> */}
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
    isAchievementCheck ? '#dfdfdf' : colors.white};
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
  width: 56px;
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
}))`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: ${({ isAchievementCheck }) =>
    isAchievementCheck ? '#bbb' : colors.primary};
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
    isAchievementCheck ? '#bbb' : colors.primary};
  font-size: 12px;

  cursor: pointer;
`;
