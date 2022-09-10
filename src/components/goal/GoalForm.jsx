import { useState } from 'react';
import styled, { css } from 'styled-components';
import BottomSheetModal from '../global/BottomSheetModal';
import CommonText from '../elements/CommonText';
import { colors } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/modalAtom';

const GoalForm = ({
  form,
  selectTime,
  handleHourClick,
  handleMinuteClick,
  handleTimeOkClick,
  handleDayClick,
  handleTitleChange,
  handlePrivateClick,
  handleColorClick,
  endDate,
  startDate,
  character,
}) => {
  const [modal, setModal] = useRecoilState(modalState);

  const dayArr = [3, 7];
  const privateArr = ['친구 공개', '나만 보기'];
  const colorsArr = [
    colors.char1,
    colors.char2,
    colors.char3,
    colors.char4,
    colors.char5,
  ];
  const hours = Array.from({ length: 13 }).map((el, index) =>
    String(index).padStart(2, '0')
  );
  const minutes = Array.from({ length: 60 }).map((el, index) =>
    String(index).padStart(2, '0')
  );

  return (
    <>
      <Container>
        <SetForm>
          <FlexContainer isIcon={true}>
            <IconContainer>
              <Icon src={character} />
            </IconContainer>
          </FlexContainer>
        </SetForm>
        <SetForm>
          <CommonText isSubtitle1={true}>목표 이름</CommonText>
          <TitleInput
            placeholder='목표 이름을 입력해 주세요'
            value={form.title}
            onChange={handleTitleChange}
          />
        </SetForm>
        <SetForm>
          <div>
            <CommonText isSubtitle1={true}>목표일</CommonText>
            <DayUl>
              {dayArr.map((day, i) => (
                <DayLi
                  key={i}
                  onClick={() => {
                    handleDayClick(day);
                  }}
                  className={form.category === day && 'active'}
                >
                  {day}일
                </DayLi>
              ))}
            </DayUl>
          </div>
          <FlexContainer>
            <CommonText isSubtitle1={true}>시작 날짜</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              {startDate}
            </CommonText>
          </FlexContainer>
          <FlexContainer>
            <CommonText isSubtitle1={true}>종료 날짜</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              {endDate}
            </CommonText>
          </FlexContainer>
        </SetForm>
        <SetForm isPointer={true}>
          <FlexContainer onClick={() => setModal({ open: true, type: 'time' })}>
            <CommonText isSubtitle1={true}>시간 설정</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              {form.time.split(':')[0]}시간 {form.time.split(':')[1]}분
            </CommonText>
          </FlexContainer>
        </SetForm>
        <SetForm isPointer={true}>
          <FlexContainer
            onClick={() => setModal({ open: true, type: 'private' })}
          >
            <CommonText isSubtitle1={true}>공개 설정</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              {form.privateCheck ? '나만 보기' : '친구 공개'}
            </CommonText>
          </FlexContainer>
        </SetForm>
        <SetForm>
          <FlexContainer>
            <CommonText isSubtitle1={true}>캐릭터 설정</CommonText>
            <CharacterUl>
              {colorsArr.map((color, i) => (
                <CharacterLi
                  key={i}
                  bgColor={color}
                  onClick={() => handleColorClick(color)}
                  className={
                    form.characterId === i + 1 && color.replace('#', '')
                  }
                ></CharacterLi>
              ))}
            </CharacterUl>
          </FlexContainer>
        </SetForm>
      </Container>

      {/* 모달 */}
      <BottomSheetModal
        isHeader={
          modal.type === 'private' || modal.type === 'character' ? false : true
        }
        title={modal.type === 'time' ? '시간' : null}
        handleOkClick={handleTimeOkClick}
      >
        {modal.type === 'time' && (
          <TimeContainer>
            <TimeDiv>
              {hours.map((hour, i) => (
                <TimeButton
                  key={i}
                  id='hour'
                  fc={
                    selectTime.hour === hour ? colors.black : colors.placeholder
                  }
                  bgc={
                    selectTime.hour === hour ? colors.secondary : 'transparent'
                  }
                  onClick={() => handleHourClick(hour)}
                >
                  {hour}
                </TimeButton>
              ))}
            </TimeDiv>
            <div>:</div>
            <TimeDiv>
              {minutes.map((minute, i) => (
                <TimeButton
                  key={i}
                  id='minute'
                  fc={
                    selectTime.minute === minute
                      ? colors.black
                      : colors.placeholder
                  }
                  bgc={
                    selectTime.minute === minute
                      ? colors.secondary
                      : 'transparent'
                  }
                  onClick={() => handleMinuteClick(minute)}
                >
                  {minute}
                </TimeButton>
              ))}
            </TimeDiv>
          </TimeContainer>
        )}
        {modal.type === 'private' && (
          <PrivateUl>
            {privateArr.map((pri, i) => (
              <PrivateLi key={i} onClick={() => handlePrivateClick(pri)}>
                {pri}
              </PrivateLi>
            ))}
          </PrivateUl>
        )}
      </BottomSheetModal>
    </>
  );
};

export default GoalForm;

const Container = styled.div`
  padding-bottom: 44px;
`;

const IconContainer = styled.div`
  width: 84px;
  height: 74px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 10px 16px;
  background-color: ${colors.valueBox};
  border-radius: 10px;
  margin-top: 8px;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.1px;
  font-weight: 500;
  border: none;
  outline: none;
  box-sizing: border-box;

  ::placeholder {
    color: ${colors.placeholder};
  }
`;

const SetForm = styled.div`
  background-color: ${colors.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 16px;
  ${({ isPointer }) =>
    isPointer &&
    css`
      cursor: pointer;
    `}

  > div + div {
    margin-top: 16px;
  }

  & + & {
    margin-top: 16px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isIcon }) => (isIcon ? 'center' : 'space-between')};
`;

const DayUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
`;

const DayLi = styled.li`
  width: 50%;
  text-align: center;
  background-color: ${colors.valueBox};
  border-radius: 23px;
  padding: 10px 0;
  color: ${colors.text};
  cursor: pointer;

  &.active {
    background-color: ${colors.primary};
    color: ${colors.white};
  }

  & + & {
    margin-left: 10px;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TimeDiv = styled.div`
  padding: 0 10px;
  margin: 0;
  list-style: none;
  width: 50%;
  height: 100px;
  overflow: scroll;
  text-align: center;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const TimeButton = styled.button`
  width: 100%;
  display: block;
  border: none;
  outline: none;
  padding: 6px 0;
  border-radius: 4px;
  background-color: ${({ bgc }) => bgc};
  color: ${({ fc }) => fc};
  box-sizing: border-box;
`;

const PrivateUl = styled.ul`
  text-align: center;
`;

const PrivateLi = styled.li`
  padding: 16px 0;
  cursor: pointer;

  & + & {
    border-top: 1px solid ${colors.border};
  }
`;

const CharacterUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CharacterLi = styled.li`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;

  &.fbe5a5 {
    box-shadow: 0 0 0 3px #ffd24c inset;
  }

  &.f29bca {
    box-shadow: 0 0 0 3px #ff5cb3 inset;
  }

  &.dbB4f4 {
    box-shadow: 0 0 0 3px #c56bfd inset;
  }

  &.bbdcad {
    box-shadow: 0 0 0 3px #5fd42d inset;
  }

  &.b4d7fc {
    box-shadow: 0 0 0 3px #479ffc inset;
  }

  & + & {
    margin-left: 8px;
  }
`;
