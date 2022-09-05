import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { ReactComponent as IconClose } from '../assets/icons/icon-close.svg';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/modalAtom';

const BottomSheetModal = ({ children, isHeader, title, handleOkClick }) => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleModalClose = () => {
    setModal({ open: false });
  };

  return (
    modal.open && (
      <ModalContainer isMobile={isMobile} onClick={handleModalClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {isHeader && (
            <ModalHeader>
              <IconContainer>
                <IconClose onClick={handleModalClose} />
              </IconContainer>
              <Title>{title}</Title>
              <ButtonContainer>
                <button onClick={handleOkClick}>확인</button>
              </ButtonContainer>
            </ModalHeader>
          )}
          {children}
        </ModalContent>
      </ModalContainer>
    )
  );
};

export default BottomSheetModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  ${({ isMobile }) =>
    isMobile
      ? css`
          left: 0;
          box-sizing: border-box;
        `
      : css`
          left: 50%;
          transform: translateX(-50%);
        `}
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  max-width: 422px;
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  height: fill-available;
  margin-right: -16px;
`;

const ModalContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: fit-content;
  padding: 16px;
  background-color: white;
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;
const Title = styled.div``;
const ButtonContainer = styled.div``;
