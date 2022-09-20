import styled from 'styled-components';
import { ReactComponent as IconAdd } from '../../assets/icons/icon-add.svg';
import { isMobile } from 'react-device-detect';

const AddButton = ({ handleAddClick }) => {
  return (
    <Container isMobile={isMobile} onClick={handleAddClick}>
      <Button>
        <IconAdd />
      </Button>
    </Container>
  );
};

export default AddButton;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: inherit;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 70px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffb55f 0%, #ff9f2e 100%), #ffb55f;
  border: none;
  outline: none;
  cursor: pointer;
`;
