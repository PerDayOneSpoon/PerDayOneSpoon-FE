import styled from 'styled-components';
import { ReactComponent as IconHeartFill } from '../../assets/icons/icon-heart-fill.svg';
import { ReactComponent as IconHeartEmpty } from '../../assets/icons/icon-heart-empty.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { ReactComponent as IconCheck } from '../../assets/icons/icon-check.svg';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';

const CalendarGoal = ({ item, isMe }) => {
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
    heartCheck,
    goalFlag,
  } = item;

  const { mutate: likeMutation } = useMutation(goalApi.likeGoal, {
    // optimistic update
    onMutate: async () => {
      const oldData = queryClient.getQueryData(['peopleSearchDate']);

      if (oldData) {
        await queryClient.cancelQueries(['peopleSearchDate']);
        queryClient.setQueriesData(['peopleSearchDate'], () => {
          return { ...oldData };
        });
      }

      return () => queryClient.setQueryData(['peopleSearchDate'], oldData);
    },
    onError: (error, values, context) => {
      queryClient.setQueryData(['peopleSearchDate'], context.oldData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['peopleSearchDate']);
    },
  });

  const handleLikeButton = (goalFlag) => {
    likeMutation({ goalFlag: goalFlag });
  };

  return (
    <GoalContainer>
      {achievementCheck ? (
        <IconContainer className='check-icon'>
          <IconCheck style={{ color: colors.orange500 }} />
        </IconContainer>
      ) : (
        <CheckContainer />
      )}
      <Container>
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
                  {startDate} - {endDate}
                </CommonText>
              </DateBox>
            </TextBox>
          </RightContent>
          <LikeContent>
            {isMe ? (
              <IconContainer>
                <IconHeartFill onClick={(e) => e.stopPropagation()} />
              </IconContainer>
            ) : heartCheck ? (
              <IconContainer>
                <IconHeartFill
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeButton(goalFlag);
                  }}
                />
              </IconContainer>
            ) : (
              <IconContainer>
                <IconHeartEmpty
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeButton(goalFlag);
                  }}
                />
              </IconContainer>
            )}

            <CommonText isFootnote2={true} fc={colors.gray600} mg='4px 0 0 0'>
              {heartCnt}
            </CommonText>
          </LikeContent>
        </Contents>
      </Container>
    </GoalContainer>
  );
};

export default CalendarGoal;

const GoalContainer = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 16px;
  }
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 16px;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;

  &.check-icon {
    margin-right: 8px;
  }

  &.calendar-icon {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    flex-basis: 20px;
    display: inline-block;

    svg {
      width: 100%;
      height: 100%;
      color: ${colors.gray300};
    }
  }
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
