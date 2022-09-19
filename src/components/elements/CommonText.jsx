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
  // isCaption,
  // isSubtitle1,
  // isSubtitle2,
  // isBody2,
  // isH6,

  isTitle1,
  isTitle2,
  isTitle3,
  isBody,
  isCallout,
  isSentece1,
  isSentece2,
  isSentece3,
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
      // isCaption={isCaption}
      // isSubtitle1={isSubtitle1}
      // isSubtitle2={isSubtitle2}
      // isBody2={isBody2}
      // isH6={isH6}

      isTitle1={isTitle1}
      isTitle2={isTitle2}
      isTitle3={isTitle3}
      isBody={isBody}
      isCallout={isCallout}
      isSentece1={isSentece1}
      isSentece2={isSentece2}
      isSentece3={isSentece3}
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

    ${({ isH6 }) =>
    isH6 &&
    css`
      font-size: 18px;
      letter-spacing: 0.15px;
      line-height: 24px;
      font-weight: 500;
    `}

/* ======================================================= */

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
      font-weight: ${({ isBold }) => (isBold ? '700' : '500')};
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

    ${({ isSentece1 }) =>
    isSentece1 &&
    css`
      font-size: 18px;
      line-height: 28px;
      font-weight: 400;
    `}

    ${({ isSentece2 }) =>
    isSentece2 &&
    css`
      font-size: 16px;
      line-height: 26px;
      font-weight: 400;
    `}

    ${({ isSentece3 }) =>
    isSentece3 &&
    css`
      font-size: 15px;
      line-height: 24px;
      font-weight: 400;
    `}

    ${({ isSubhead }) =>
    isSubhead &&
    css`
      font-size: 15px;
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
