import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { ReactComponent as IconClose } from '../../assets/icons/icon-close.svg';
import { useRecoilState } from 'recoil';
import { bottomModalState } from '../../recoil/common';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const BottomSheetModal = ({ children, isHeader, title, handleOkClick }) => {
  const [bottomModal, setBottomModal] = useRecoilState(bottomModalState);
  const [isOpen, setIsOpen] = useState('openModal');

  const handleModalClose = () => {
    setIsOpen('closeModal');
    setTimeout(() => setBottomModal({ ...bottomModal, open: false }), 500);
  };

  useEffect(() => {
    if (bottomModal.open) {
      setTimeout(() => {
        setIsOpen('');
      }, 500);
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    } else {
      setIsOpen('openModal');
    }
  }, [bottomModal.open]);

  if (!bottomModal.open) return null;

  return (
    // modal.open && (
    <ModalContainer
      isOpen={isOpen}
      isMobile={isMobile}
      onClick={handleModalClose}
    >
      <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        {isHeader && (
          <ModalHeader>
            <IconContainer>
              <IconClose onClick={handleModalClose} />
            </IconContainer>
            <CommonText isBody={true}>{title}</CommonText>
            <ButtonContainer>
              <ModalButton onClick={handleOkClick}>확인</ModalButton>
            </ButtonContainer>
          </ModalHeader>
        )}
        {children}
      </ModalContent>
    </ModalContainer>
    // )
  );
};

export default BottomSheetModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  height: fill-available;

  ${({ isOpen }) =>
    isOpen === 'openModal'
      ? css`
          animation: ${opacity} 0.5s ease-in 0s 1 normal;
        `
      : isOpen === 'closeModal'
      ? css`
          animation: ${opacity} 0.5s ease-in 0s 1 reverse;
        `
      : css``};
`;
const opacity = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

const ModalContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: fit-content;
  padding: 16px;
  background-color: ${colors.white};
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  ${({ isOpen }) =>
    isOpen === 'openModal'
      ? css`
          animation: ${slide} 0.5s ease-in 0s 1 normal;
        `
      : isOpen === ''
      ? css``
      : css`
          animation: ${slide} 0.5s ease-in 0s 1 reverse;
        `};
`;

const slide = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
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
const ButtonContainer = styled.div``;
const ModalButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
`;
