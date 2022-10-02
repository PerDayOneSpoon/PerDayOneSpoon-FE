import styled from 'styled-components';
import { colors } from '../theme/theme';
import { ReactComponent as IconDelete } from '../assets/icons/icon-trash.svg';
import CommonText from './elements/CommonText';

const Comment = ({ commentData, handleCommentDelete }) => {
  console.log(commentData);
  return (
    <Container>
      <ContentContainer>
        <ImgContainer>
          {/* <img src={commentData.profileUrl} alt='' /> */}
        </ImgContainer>
        <TextContainer>
          <CommonText isFootnote1={true} isBold={true} fc={colors.gray700}>
            {/* <Name>{commentData.name}</Name> {commentData.comment} */}
          </CommonText>
          <CommonText fz='11px' fc={colors.gray500} mg='8px 0 0 0'>
            {/* {commentData.time} */}
          </CommonText>
        </TextContainer>
      </ContentContainer>
      {/* {commentData.me && ( */}
      <IconContainer onClick={handleCommentDelete}>
        <IconDelete />
      </IconContainer>
      {/* )} */}
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: max-content;

  & + & {
    margin-top: 16px;
  }
`;

const ContentContainer = styled.div`
  display: flex;

  > div + div {
    margin-left: 12px;
  }
`;

const ImgContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${colors.gray200};
  flex-shrink: 0;
  flex-basis: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
`;

const Name = styled.span`
  font-weight: bold;
  margin-right: 8px;
  color: ${colors.black};
`;

const IconContainer = styled.div`
  width: 22px;
  height: 22px;
  margin-left: 16px;
  flex-shrink: 0;
  flex-basis: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
