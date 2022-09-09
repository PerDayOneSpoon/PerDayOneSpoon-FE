import { useState } from 'react';
import styled, { css } from 'styled-components';
import BottomSheetModal from '../global/BottomSheetModal';
import CommonText from '../elements/CommonText';
import characterQuestion from '../../assets/imgs/character-question-mark.png';
import character1 from '../../assets/imgs/character1.png';
import character2 from '../../assets/imgs/character2.png';
import character3 from '../../assets/imgs/character3.png';
import character4 from '../../assets/imgs/character4.png';
import character5 from '../../assets/imgs/character5.png';
import { colors } from '../../theme/theme';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/modalAtom';

const GoalForm = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [character, setCharacter] = useState(characterQuestion);
  const colorsArr = [
    colors.char1,
    colors.char2,
    colors.char3,
    colors.char4,
    colors.char5,
  ];
  const dayArr = ['3일', '7일'];

  const handleColorClick = (color) => {
    switch (color) {
      case colors.char1:
        return setCharacter(character1);
        break;
      case colors.char2:
        return setCharacter(character2);
        break;
      case colors.char3:
        return setCharacter(character3);
        break;
      case colors.char4:
        return setCharacter(character4);
        break;
      case colors.char5:
        return setCharacter(character5);
        break;
      default:
        return characterQuestion;
    }
  };

  const handleDayClick = (day) => {
    console.log('day', day);
  };

  const handleOkClick = () => {
    if (modal.type === 'month') {
      console.log('month ok click');
    }
    if (modal.type === 'time') {
      console.log('time ok click');
    }
  };

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
          <TitleInput placeholder='목표 이름을 입력해 주세요' />
        </SetForm>
        <SetForm>
          <div>
            <CommonText isSubtitle1={true}>목표일</CommonText>
            <DayUl>
              {dayArr.map((day, i) => (
                <DayLi key={i} onClick={() => handleDayClick(day)}>
                  {day}
                </DayLi>
              ))}
            </DayUl>
          </div>
          <FlexContainer>
            <CommonText isSubtitle1={true}>시작 날짜</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              2022년 08월 28일
            </CommonText>
          </FlexContainer>
          <FlexContainer>
            <CommonText isSubtitle1={true}>종료 날짜</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              2022년 08월 30일
            </CommonText>
          </FlexContainer>
        </SetForm>
        <SetForm isPointer={true}>
          <FlexContainer onClick={() => setModal({ open: true, type: 'time' })}>
            <CommonText isSubtitle1={true}>시간 설정</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              10분
            </CommonText>
          </FlexContainer>
        </SetForm>
        <SetForm isPointer={true}>
          <FlexContainer
            onClick={() => setModal({ open: true, type: 'private' })}
          >
            <CommonText isSubtitle1={true}>공개 설정</CommonText>
            <CommonText isSubtitle1={true} fc={colors.text}>
              친구 공개
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
        handleOkClick={handleOkClick}
      >
        {/* {modal.type === 'month' && <MonthCalendar />} */}

        {modal.type === 'time' && <div>시간설정 모달</div>}
        {modal.type === 'private' && (
          <PrivateUl>
            <PrivateLi>친구 공개</PrivateLi>
            <PrivateLi>나만 보기</PrivateLi>
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

  & + & {
    margin-left: 10px;
  }
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

  & + & {
    margin-left: 8px;
  }
`;
