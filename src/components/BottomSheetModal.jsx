import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';

const BottomSheetModal = () => {
  return (
    <ModalContainer isMobile={isMobile}>
      <ModalContent>
        fdfsdfsdfdsfdsfsdffffffffffdfsdfsdfdsfdsfsdffffffffffdfsdfsdfdsfdsfsdffffffffffdfsdfsdfdsfdsfsdffffffffffdfsdfsdfdsfdsfsdfffffffff????
      </ModalContent>
    </ModalContainer>
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
  background-color: rgba(0, 0, 0, 0.65);
  max-width: 422px;
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  height: fill-available;
  border: 1px solid green;

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
  border: 1px solid blue;
  border-radius: 10px 10px 0px 0px;
`;

const Wrap = styled.div`
  width: 100%;
`;
