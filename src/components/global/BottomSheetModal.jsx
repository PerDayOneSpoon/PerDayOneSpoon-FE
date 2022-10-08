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
  const [animationState, setAnimationState] = useState(false);

  const handleModalClose = () => {
    setAnimationState(true);

    setTimeout(() => {
      setAnimationState(false);
      setBottomModal({ ...bottomModal, open: false });
    }, 400);
  };

  return (
    bottomModal.open && (
      <ModalContainer
        animationState={animationState}
        isMobile={isMobile}
        onClick={handleModalClose}
      >
        <ModalContent
          animationState={animationState}
          // isOpen={isOpen}
          onClick={(e) => e.stopPropagation()}
        >
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
    )
  );
};

export default BottomSheetModal;

const fadeIn = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

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

  animation: ${({ animationState }) => (animationState ? fadeOut : fadeIn)} 0.5s
    ease-in;
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
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
  animation: ${({ animationState }) => (animationState ? slideUp : slideDown)}
    0.5s ease-in;
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
