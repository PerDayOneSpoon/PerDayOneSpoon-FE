import styled from 'styled-components';
import CollectionBadge from './CollectionBadge';
import BottomSheetModal from '../global/BottomSheetModal';
import { collectionApi } from '../../api/collectionApi';
import { useQuery } from 'react-query';
import Loading from '../global/Loading';
import { useRecoilState } from 'recoil';
import { bottomModalState } from '../../recoil/common';
import CommonText from '../elements/CommonText';
import { colors } from '../../theme/theme';

const CollectionList = () => {
  const [bottomModal, setBottomModal] = useRecoilState(bottomModalState);

  const {
    isLoading,
    isError,
    error,
    data: badgeData,
  } = useQuery(['myCalendar'], collectionApi.getBadge, {
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const handleBadgeClick = (id) => {
    setBottomModal({ open: true, type: id });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <BadgeContainer>
          {badgeData?.data?.badgeResponseDtoList?.map((badge) => (
            <CollectionBadge
              key={badge.badgeNumber}
              badge={badge}
              handleBadgeClick={handleBadgeClick}
            />
          ))}
        </BadgeContainer>
      </Container>
      <BottomSheetModal>
        {badgeData?.data?.badgeResponseDtoList?.map(
          (item, index) =>
            item.badgeNumber === bottomModal.type && (
              <ModalContainer key={item.badgeNumber}>
                <ModalContainerInner>
                  <ImgContainer>
                    <img src={item.badgeUrl} alt='뱃지 이미지' />
                  </ImgContainer>

                  <CommonText isBody={true} mg='12px 0 0 0'>
                    {item.badgeName}
                  </CommonText>

                  {item.createdAt !== null && (
                    <CommonText
                      isFootnote1={true}
                      fc={colors.gray500}
                      mg='4px 0 0 0'
                    >
                      획득일: {item.createdAt}
                    </CommonText>
                  )}
                  <CommonText
                    isSentence2={true}
                    mg='12px 0 0 0'
                    fc={colors.gray700}
                  >
                    {item.badgeInfo}
                  </CommonText>
                </ModalContainerInner>
              </ModalContainer>
            )
        )}
      </BottomSheetModal>
    </>
  );
};

export default CollectionList;

const Container = styled.div`
  margin-top: 16px;
  padding-bottom: 50px;
`;

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px 10px;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 20px;
`;

const ModalContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 120px;
  height: 120px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
