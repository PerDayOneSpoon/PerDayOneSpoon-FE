import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import styled from 'styled-components';
import { ReactComponent as IconClose } from '../../assets/icons/icon-close.svg';
import { colors } from '../../theme/theme';

const ToastModal = ({ toastMessage }) => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  console.log(state);

  const handleClick = () => {
    setState({ ...state, open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

  return (
    <Container>
      <button onClick={handleClick}>Open simple snackbar</button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={toastMessage}
      />
    </Container>
  );
};

export default ToastModal;

const Container = styled.div`
  .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root {
    background-color: ${colors.primary};
    border-radius: 32px;
  }
`;
