import styled, { css } from 'styled-components';

const CommonText = ({
  children,
  fc,
  fz,
  fw,
  mg,
  pd,
  lh,
  wd,

  isTitle1,
  isTitle2,
  isTitle3,
  isBody,
  isCallout,
  isSentence1,
  isSentence2,
  isSentence3,
  isSubhead,
  isFootnote1,
  isFootnote2,
  isBold,
  className,
}) => {
  return (
    <Text
      fc={fc}
      fz={fz}
      fw={fw}
      mg={mg}
      lh={lh}
      pd={pd}
      wd={wd}
      isTitle1={isTitle1}
      isTitle2={isTitle2}
      isTitle3={isTitle3}
      isBody={isBody}
      isCallout={isCallout}
      isSentence1={isSentence1}
      isSentence2={isSentence2}
      isSentence3={isSentence3}
      isSubhead={isSubhead}
      isFootnote1={isFootnote1}
      isFootnote2={isFootnote2}
      isBold={isBold}
      className={className}
    >
      {children}
    </Text>
  );
};

export default CommonText;

const Text = styled.div`
  ${({ isTitle1, isBold }) =>
    isTitle1 &&
    css`
      font-size: 28px;
      line-height: 34px;
      font-weight: ${({ isBold }) => (isBold ? '700' : '400')};
    `}

  ${({ isTitle2, isBold }) =>
    isTitle2 &&
    css`
      font-size: 22px;
      line-height: 28px;
      font-weight: ${({ isBold }) => (isBold ? '700' : '500')};
    `}

    ${({ isTitle3, isBold }) =>
    isTitle3 &&
    css`
      font-size: 20px;
      line-height: 25px;
      font-weight: ${({ isBold }) => (isBold ? '700' : '600')};
    `}

    ${({ isBody }) =>
    isBody &&
    css`
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;
    `}

    ${({ isCallout }) =>
    isCallout &&
    css`
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
    `}

    ${({ isSentence1 }) =>
    isSentence1 &&
    css`
      font-size: 18px;
      line-height: 28px;
      font-weight: 400;
    `}

    ${({ isSentence2 }) =>
    isSentence2 &&
    css`
      font-size: 16px;
      line-height: 26px;
      font-weight: 400;
    `}

    ${({ isSentence3 }) =>
    isSentence3 &&
    css`
      font-size: 15px;
      line-height: 24px;
      font-weight: 400;
    `}

    ${({ isSubhead }) =>
    isSubhead &&
    css`
      font-size: 16px;
      line-height: 18px;
      font-weight: 600;
    `}

    ${({ isFootnote1, isBold }) =>
    isFootnote1 &&
    css`
      font-size: 13px;
      line-height: 16px;
      font-weight: ${({ isBold }) => (isBold ? '600' : '400')};
    `}

    ${({ isFootnote2, isBold }) =>
    isFootnote2 &&
    css`
      font-size: 12px;
      line-height: 14px;
      font-weight: ${({ isBold }) => (isBold ? '600' : '400')};
    `}


  width: ${({ wd }) => wd};
  color: ${({ fc }) => fc};
  font-size: ${({ fz }) => fz};
  font-weight: ${({ fw }) => fw};
  margin: ${({ mg }) => mg};
  padding: ${({ pd }) => pd};
  line-height: ${({ lh }) => lh};
`;
