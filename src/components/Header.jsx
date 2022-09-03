import styled from 'styled-components';

const Header = ({ isMain, isTitle, title }) => {
  if (isMain) {
    return (
      <Container>
        <ContainerInner isMain={isMain}>
          <DateText>2022년 8월 31일</DateText>
          <IconGroup>
            <Icon />
            <Icon />
          </IconGroup>
        </ContainerInner>
      </Container>
    );
  } else if (isTitle) {
    return (
      <Container>
        <ContainerInner isTitle={isTitle}>
          <IconContainer>
            <Icon />
          </IconContainer>
          <TitleText>{title}</TitleText>
          <button>추가</button>
        </ContainerInner>
      </Container>
    );
  } else {
    return (
      <Container>
        <ContainerInner>
          <IconGroup>
            <Icon />
            <Icon />
          </IconGroup>
        </ContainerInner>
      </Container>
    );
  }
};

export default Header;

const Container = styled.div`
  background-color: #eee;
  width: calc(100% + 32px);
  height: 56px;
  padding: 16px;
  box-sizing: border-box;
  margin-left: -16px;
  margin-bottom: 16px;
`;

const ContainerInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ isMain, isTitle }) =>
    isMain || isTitle ? 'space-between' : 'flex-end'};
`;

const DateText = styled.h2``;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div``;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-color: black;
  & + & {
    margin-left: 6px;
  }
`;

const TitleText = styled.h2``;
