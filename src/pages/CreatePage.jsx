import React from 'react';
import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalForm from '../components/goal/GoalForm';
import ToastModal from '../components/global/ToastModal';
import character1 from '../assets/imgs/character1.png';
import character2 from '../assets/imgs/character2.png';
import character3 from '../assets/imgs/character3.png';
import character4 from '../assets/imgs/character4.png';
import character5 from '../assets/imgs/character5.png';
import characterQuestion from '../assets/imgs/character-question-mark.png';
import { colors } from '../theme/theme';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { goalApi } from '../api/goalApi';
import { useRecoilState } from 'recoil';
import { bottomModalState } from '../recoil/common';
import dayjs from 'dayjs';

const CreatePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [bottomModal, setBottomModal] = useRecoilState(bottomModalState);
  const [toast, setToast] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const startDate = dayjs().format('YYYY년 MM월 DD일');
  const [endDate, setEndDate] = useState(
    dayjs().add(2, 'days').format('YYYY년 MM월 DD일')
  );
  const [character, setCharacter] = useState(characterQuestion);
  const [selectTime, setSelectTime] = useState({
    hour: '00',
    minute: '01',
  });

  const [form, setForm] = useState({
    title: '',
    category: 3,
    characterId: 0,
    privateCheck: false,
    time: `${selectTime.hour}:${selectTime.minute}`,
  });

  const addGoalMutation = useMutation(goalApi.addGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['goalInfo']);
      queryClient.invalidateQueries(['myCalendar']);
      navigate('/');
    },
    onError: ({ response }) => {
      alert(response.data.errorMessage);
    },
  });

  const handleRightButtonClick = () => {
    if (form.title === '') {
      setToast(false);
      setToastMessage('제목을 입력해 주세요');
      setTimeout(() => setToast(true), 3000);
    } else if (form.characterId === 0) {
      setToast(false);
      setToastMessage('캐릭터를 선택해 주세요');
      setTimeout(() => setToast(true), 3000);
      // return alert('캐릭터를 선택해 주세요');
    } else if (form.time === '00:00') {
      setToast(false);
      setToastMessage('설정한 습관의 타이머를 유효한 값으로 수정해주세요');
      setTimeout(() => setToast(true), 3000);
      // return alert('설정한 습관의 타이머를 유효한 값으로 수정해주세요');
    } else {
      if (
        window.confirm(
          '한 번 추가하신 습관은 수정이 불가능합니다. 추가하시겠습니까?'
        )
      ) {
        addGoalMutation.mutate(form);
      } else {
        return;
      }
    }
  };

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleDayClick = (day) => {
    if (day === 3) {
      setForm({ ...form, category: day });
      setEndDate(dayjs().add(2, 'days').format('YYYY년 MM월 DD일'));
    }
    if (day === 7) {
      setForm({ ...form, category: day });
      setEndDate(dayjs().add(6, 'days').format('YYYY년 MM월 DD일'));
    }
  };

  const handlePrivateClick = (pri) => {
    if (pri === '친구 공개') setForm({ ...form, privateCheck: false });
    if (pri === '나만 보기') setForm({ ...form, privateCheck: true });
    setBottomModal({ open: false, type: 'private' });
  };

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

  const handleHourClick = (hour) => {
    setSelectTime({ ...selectTime, hour: hour });
  };

  const handleMinuteClick = (minute) => {
    setSelectTime({ ...selectTime, minute: minute });
  };

  const handleTimeOkClick = () => {
    if (bottomModal.type === 'time') {
      setForm({ ...form, time: `${selectTime.hour}:${selectTime.minute}` });
      setBottomModal({ open: false, type: 'time' });
    }
  };

  // console.log('form 전송 데이터', form);

  return (
    <Layout bgColor={colors.bgColor} hasNavBar={false}>
      <Header
        hasBack={true}
        title='습관 추가'
        handleRightButtonClick={handleRightButtonClick}
        rightButton='추가'
      />

      <GoalForm
        form={form}
        selectTime={selectTime}
        startDate={startDate}
        endDate={endDate}
        character={character}
        handleHourClick={handleHourClick}
        handleMinuteClick={handleMinuteClick}
        handleTitleChange={handleTitleChange}
        handleDayClick={handleDayClick}
        handleTimeOkClick={handleTimeOkClick}
        handlePrivateClick={handlePrivateClick}
        handleColorClick={handleColorClick}
      />
      {toastMessage !== '' ? (
        <ToastModal toastMessage={toastMessage} displayNone={toast} />
      ) : null}
    </Layout>
  );
};

export default CreatePage;
