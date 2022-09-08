import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconHeartEmpty } from '../../assets/icons/icon-heart-empty.svg';
import { ReactComponent as IconHeartFill } from '../../assets/icons/icon-heart-fill.svg';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const Goal = ({ isMain, item }) => {
  const [isTimer, setIsTimer] = useState(false);

  return (
    <Container onClick={() => setIsTimer(!isTimer)}>
      <Contents>
        <RightContent>
          <ChracterContainer>
            <Character src={item.charImg} />
          </ChracterContainer>

          <div>
            <CommonText isSubtitle1={true}>{item.title}</CommonText>
            <CommonText isCaption={true} fc={colors.text}>
              {item.startDate} - {item.endDate}
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
            {item.likeNum}
          </CommonText>
        </LikeContent>
      </Contents>
      {isMain && isTimer && (
        <TimerContainer>
          <Timer>
            <Time>{item.tiem}</Time>
            <ProgressBar />
          </Timer>
          <Button onClick={(e) => e.stopPropagation()}>시작</Button>
        </TimerContainer>
      )}
    </Container>
  );
};

export default Goal;

const Container = styled.div`
  padding: 16px;
  background-color: ${colors.white};
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

const Time = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Timer = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  margin-top: 4px;
  background-color: ${colors.inputColor};
  border-radius: 4px;
`;

const Button = styled.button`
  width: 50px;
  margin-bottom: -4px;
  margin-left: 16px;
`;
