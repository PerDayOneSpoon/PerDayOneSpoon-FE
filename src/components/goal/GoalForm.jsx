import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment/moment';
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
import { goalState } from '../../recoil/common';

const GoalForm = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [form, setForm] = useRecoilState(goalState);

  const [character, setCharacter] = useState(characterQuestion);

  const colorsArr = [
    colors.char1,
    colors.char2,
    colors.char3,
    colors.char4,
    colors.char5,
  ];
  const dayArr = [3, 7];
  const privateArr = ['친구 공개', '나만 보기'];

  const startDate = moment().format('YYYY년 MM월 DD일');
  const [endDate, setEndDate] = useState(
    moment().add(2, 'days').format('YYYY년 MM월 DD일')
  );

  const handleColorClick = (color) => {
    switch (color) {
      case colors.char1:
        setCharacter(character1);
        setForm({ ...form, characterId: 1 });
        break;
      case colors.char2:
        setCharacter(character2);
        setForm({ ...form, characterId: 2 });
        break;
      case colors.char3:
        setCharacter(character3);
        setForm({ ...form, characterId: 3 });
        break;
      case colors.char4:
        setCharacter(character4);
        setForm({ ...form, characterId: 4 });
        break;
      case colors.char5:
        setCharacter(character5);
        setForm({ ...form, characterId: 5 });
        break;
      default:
        return characterQuestion;
    }
  };

  const handlePrivateClick = (pri) => {
    if (pri === '친구 공개') setForm({ ...form, privateCheck: false });
    if (pri === '나만 보기') setForm({ ...form, privateCheck: true });
    setModal({ open: false, type: 'private' });
  };

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleDayClick = (day) => {
    if (day === 3) {
      setForm({ ...form, category: day });
      setEndDate(moment().add(2, 'days').format('YYYY년 MM월 DD일'));
    }
    if (day === 7) {
      setForm({ ...form, category: day });
      setEndDate(moment().add(6, 'days').format('YYYY년 MM월 DD일'));
    }
  };

  const handleOkClick = () => {
    if (modal.type === 'time') {
      console.log('time ok click');
      setModal({ open: false, type: 'time' });
    }
  };

  // console.log('form', form);
  // console.log('form.title', form.title);
  // console.log('form.category', form.category);

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
        handleOkClick={handleOkClick}
      >
        {/* {modal.type === 'month' && <MonthCalendar />} */}

        {modal.type === 'time' && <div>시간설정 모달</div>}
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
    border: 2px solid #ffd24c;
  }

  &.f29bca {
    border: 2px solid #ff4bab;
  }

  &.dbB4f4 {
    border: 2px solid #c56bfd;
  }

  &.bbdcad {
    border: 2px solid #5fd42d;
  }

  &.b4d7fc {
    border: 2px solid #479ffc;
  }

  & + & {
    margin-left: 8px;
  }
`;
