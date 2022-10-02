import styled from 'styled-components';

const CommonButton = ({
  text,
  wd,
  ht,
  pd,
  mg,
  bg,
  bd,
  bdrs,
  fc,
  fz,
  lh,
  fw,
  handleButtonClick,
  disabled,
  flexBasis,
  className,
}) => {
  return (
    <ButtonContainer mg={mg} ht={ht}>
      <Button
        wd={wd}
        // ht={ht}
        pd={pd}
        bg={bg}
        bd={bd}
        bdrs={bdrs}
        fc={fc}
        fz={fz}
        lh={lh}
        fw={fw}
        onClick={handleButtonClick}
        disabled={disabled}
        className={className}
        flexBasis={flexBasis}
      >
        {text}
      </Button>
    </ButtonContainer>
  );
};

export default CommonButton;

const ButtonContainer = styled.div`
  margin: ${({ mg }) => mg};
  height: ${({ ht }) => ht};
`;

const Button = styled.button`
  width: ${({ wd }) => wd};
  height: 100%;
  padding: ${({ pd }) => pd};
  background: ${({ bg }) => bg};
  border: ${({ bd }) => bd};
  border-radius: ${({ bdrs }) => bdrs};
  color: ${({ fc }) => fc};
  font-size: ${({ fz }) => fz};
  line-height: ${({ lh }) => lh};
  font-weight: ${({ fw }) => fw};
  flex-basis: ${({ flexBasis }) => flexBasis};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :disabled {
    cursor: unset;
  }
`;
