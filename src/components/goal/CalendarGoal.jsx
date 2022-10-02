import styled from 'styled-components';
import { ReactComponent as IconHeartFill } from '../../assets/icons/icon-heart-fill.svg';
import { ReactComponent as IconHeartEmpty } from '../../assets/icons/icon-heart-empty.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/icon-calendar.svg';
import { ReactComponent as IconCheck } from '../../assets/icons/icon-check.svg';
import { colors } from '../../theme/theme';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';
import { useState } from 'react';
import CommonText from '../elements/CommonText';
import CommonButton from '../elements/CommonButton';
import Comment from '../Comment';

const CalendarGoal = ({ item, isMe }) => {
  const queryClient = useQueryClient();
  const [isComment, setIsComment] = useState(false);
  const [commentForm, setCommentForm] = useState({
    id: 0,
    comment: '',
  });

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

  const dummyData = [
    {
      id: 1,
      name: '소연',
      profileUrl: '',
      comment: '댓글댓글댓글',
      time: '3분 전',
      me: true,
    },
    {
      id: 2,
      name: '민섭',
      profileUrl: '',
      comment: '댓글을 써보자',
      time: '10분 전',
      me: false,
    },
    {
      id: 3,
      name: '민섭김',
      profileUrl: '',
      comment:
        '아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! 아주 아주 긴 문장도 써보자! ',
      time: '12분 전',
      me: false,
    },
    {
      id: 4,
      name: '전소연',
      profileUrl: '',
      comment: '민섭님 바보 바보',
      time: '15분 전',
      me: false,
    },
  ];

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

  // console.log('commentForm', commentForm);

  return (
    <GoalContainer>
      {achievementCheck ? (
        <IconContainer className='check-icon'>
          <IconCheck style={{ color: colors.orange500 }} />
        </IconContainer>
      ) : (
        <CheckContainer />
      )}
      <Container onClick={() => setIsComment(!isComment)}>
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
        {isComment && (
          <CommentContents onClick={(e) => e.stopPropagation()}>
            <CommentList>
              {dummyData.map((item) => (
                <Comment
                  // commentData={dummyData}
                  key={item.id}
                  handleCommentDelete={(e) => e.stopPropagation()}
                />
              ))}
            </CommentList>
            <CommentForm>
              <InputContainer>
                <input
                  type='text'
                  value={commentForm.comment}
                  onChange={(e) => {
                    setCommentForm({
                      id: id,
                      comment: e.target.value,
                    });
                  }}
                />
              </InputContainer>
              <FormButtonContainer>
                <CommonButton
                  wd='50px'
                  ht='100%'
                  pd='4px 0'
                  bdrs='20px'
                  text='전송'
                  fz='12px'
                  fc={colors.white}
                  bg={colors.orange500}
                  bd='none'
                  handleButtonClick={() =>
                    console.log('commentForm전송!', commentForm)
                  }
                />
              </FormButtonContainer>
            </CommentForm>
          </CommentContents>
        )}
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
  border: 1px solid red;
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

const CommentContents = styled.div`
  margin-top: 24px;
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 4px 12px;
  background-color: ${colors.gray100};
  box-sizing: border-box;

  input {
    width: 100%;
    height: 100%;
    display: inline-block;
    box-sizing: border-box;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const FormButtonContainer = styled.div`
  width: 50px;
  height: 100%;
  margin-left: 8px;
  display: flex;
  justify-content: flex-end;
`;

const CommentList = styled.div``;
