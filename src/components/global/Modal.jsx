import styled from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/common';

const Modal = ({
  modalText,
  handleModalOk,
  handleModalDelete,
  bgTransparent = true,
}) => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleClose = () => {
    setModal({ open: false, type: '' });
  };

  return (
    modal.open && (
      <ModalContainer onClick={handleClose} bgTransparent={bgTransparent}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <TextWrap>
            <CommonText isBody={true} fc={colors.gray700} lh='24px'>
              {modalText}
            </CommonText>
          </TextWrap>
          {modal.type === 'confirm' && (
            <ButtonGroup>
              <ModalButton onClick={handleModalOk}>확인</ModalButton>
              <ModalButton onClick={handleClose}>취소</ModalButton>
            </ButtonGroup>
          )}
          {modal.type === 'alert' && (
            <ButtonGroup>
              <ModalButton onClick={handleModalOk}>확인</ModalButton>
            </ButtonGroup>
          )}
          {modal.type === 'delete' && (
            <ButtonGroup>
              <ModalButton deleteButton={true} onClick={handleModalDelete}>
                삭제
              </ModalButton>
              <ModalButton onClick={handleClose}>닫기</ModalButton>
            </ButtonGroup>
          )}
        </ModalContent>
      </ModalContainer>
    )
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgTransparent }) =>
    bgTransparent ? 'rgba(0, 0, 0, 0.5)' : '#777'};
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  padding: 0 50px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background: ${colors.white};
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 32px;
`;

const TextWrap = styled.div`
  width: 100%;
  padding: 0 24px;
  text-align: center;
  box-sizing: border-box;
  word-break: break-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
`;

const ModalButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${({ deleteButton }) =>
    deleteButton ? colors.danger : colors.orange500};
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  text-align: center;

  border: none;
  outline: none;
  cursor: pointer;

  &:first-child {
    color: ${colors.white};
  }

  & + & {
    background-color: ${colors.white};
    border: 2px solid ${colors.gray100};
    box-sizing: border-box;
    color: ${colors.gray700};
  }
`;
