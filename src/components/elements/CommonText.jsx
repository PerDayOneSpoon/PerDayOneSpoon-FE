import styled, { css } from 'styled-components';

const CommonText = ({
  children,
  fc,
  fz,
  fw,
  mg,
  pd,
  lh,
  isCaption,
  isSubtitle1,
  isSubtitle2,
  isBody2,
}) => {
  return (
    <Text
      fc={fc}
      fz={fz}
      fw={fw}
      mg={mg}
      lh={lh}
      pd={pd}
      isCaption={isCaption}
      isSubtitle1={isSubtitle1}
      isSubtitle2={isSubtitle2}
      isBody2={isBody2}
    >
      {children}
    </Text>
  );
};

export default CommonText;

const Text = styled.div`
  ${({ isCaption }) =>
    isCaption &&
    css`
      font-size: 12px;
      letter-spacing: 0.4px;
      line-height: 16px;
      font-weight: 400;
    `}

  ${({ isSubtitle1 }) =>
    isSubtitle1 &&
    css`
      font-size: 16px;
      letter-spacing: 0.15px;
      line-height: 24px;
      font-weight: 400;
    `}

  ${({ isSubtitle2 }) =>
    isSubtitle2 &&
    css`
      font-size: 14px;
      letter-spacing: 0.1px;
      line-height: 24px;
      font-weight: 500;
    `}

  ${({ isBody2 }) =>
    isBody2 &&
    css`
      font-size: 14px;
      letter-spacing: 0.25px;
      line-height: 20px;
      font-weight: 400;
    `}


  color: ${({ fc }) => fc};
  font-size: ${({ fz }) => fz};
  font-weight: ${({ fw }) => fw};
  margin: ${({ mg }) => mg};
  padding: ${({ pd }) => pd};
  line-height: ${({ lh }) => lh};
`;
