import styled, { css } from 'styled-components';
import { colors } from '../../theme/theme';
import { ReactComponent as IconAdd } from '../../assets/icons/icon-add.svg';
import { isMobile } from 'react-device-detect';

const AddButton = ({ handleAddClick }) => {
  return (
    <Container isMobile={isMobile}>
      <Button>
        <IconAdd onClick={handleAddClick} />
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
  position: fixed;
  bottom: 70px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${colors.primary};
  border: none;
  outline: none;
  cursor: pointer;
`;