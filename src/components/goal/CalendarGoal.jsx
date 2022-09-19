import styled from 'styled-components';
import { ReactComponent as IconHeartFill } from '../../assets/icons/icon-heart-fill.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { useQueryClient } from 'react-query';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const CalendarGoal = ({ item }) => {
  const queryClient = useQueryClient();

  const {
    id,
    title,
    characterUrl,
    startDate,
    endDate,
    heartCnt,
    achievementCheck,
    privateCheck,
  } = item;

  return (
    <Container isAchievementCheck={achievementCheck}>
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
            <IconHeartFill onClick={(e) => e.stopPropagation()} />
          </IconContainer>
          <CommonText isCaption={true} fc={colors.text}>
            {heartCnt}
          </CommonText>
        </LikeContent>
      </Contents>
    </Container>
  );
};

export default CalendarGoal;

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

  &.calendar-icon {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    flex-basis: 20px;
    display: inline-block;

    svg {
      width: 100%;
      height: 100%;
    }
  }
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
