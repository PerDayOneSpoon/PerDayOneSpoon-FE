import styled from 'styled-components';
import { colors } from '../theme/theme';
import { ReactComponent as IconDelete } from '../assets/icons/icon-trash.svg';
import CommonText from './elements/CommonText';

const Comment = ({ commentData, handleCommentDelete, isMe }) => {
  return commentData === undefined ? (
    <div>아직 댓글이 없습니다.</div>
  ) : (
    <Container>
      <ContentContainer>
        <ImgContainer>
          <img src={commentData.profileImage} alt='프로필 이미지' />
        </ImgContainer>
        <TextContainer>
          <CommonText isFootnote1={true} isBold={true} fc={colors.gray700}>
            <Name>{commentData.nickname}</Name> {commentData.content}
          </CommonText>
          <CommonText fz='11px' fc={colors.gray500} mg='8px 0 0 0'>
            {commentData.createdAt}
          </CommonText>
        </TextContainer>
      </ContentContainer>
      {(commentData.me || isMe) && (
        <IconContainer
          onClick={() => handleCommentDelete(commentData.commentId)}
        >
          <IconDelete />
        </IconContainer>
      )}
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
