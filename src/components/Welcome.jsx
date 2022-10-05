import styled from 'styled-components';
import { useState, useRef } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import CommonText from './elements/CommonText';
import { colors } from '../theme/theme';
import welcomeImg1 from '../assets/imgs/welcome1.png';
import welcomeImg3 from '../assets/imgs/welcome3.png';
import welcomeImg4 from '../assets/imgs/welcome4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Welcome = () => {
  SwiperCore.use([Navigation]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const swiperParams = {
    navigation: {
      prevE1: navigationPrevRef.current,
      nextE1: navigationNextRef.current,
    },
  };

  return (
    <Swiper {...swiperParams}>
      <SwiperSlide>
        <TextContainer>
          <CommonText
            fc={colors.white}
            isTitle1={true}
            isBold={false}
            // wd='190px'
            fz='40px'
          >
            습관을 실천할 시간을 <br />
            설정하여 추가해주세요!
          </CommonText>
        </TextContainer>
        <ImgContainer>
          <WelcomeImg1 src={welcomeImg1} />
        </ImgContainer>
      </SwiperSlide>
      <SwiperSlide>
        <TextContainer>
          <CommonText
            fc={colors.white}
            isTitle1={true}
            isBold={false}
            // wd='190px'
            fz='40px'
          >
            하루 한 줌을 이용하고 <br />
            다양한 뱃지를 모아보세요!
          </CommonText>
        </TextContainer>
        <ImgContainer>
          <WelcomeImg1 src={welcomeImg3} />
        </ImgContainer>
      </SwiperSlide>
      <SwiperSlide>
        {' '}
        <TextContainer>
          <CommonText
            fc={colors.white}
            isTitle1={true}
            isBold={false}
            // wd='190px'
            fz='40px'
          >
            크롬에서 웹 앱을 <br />
            다운받아 사용해보세요!
          </CommonText>
        </TextContainer>
        <ImgContainer>
          <WelcomeImg1 src={welcomeImg4} />
        </ImgContainer>
      </SwiperSlide>
    </Swiper>
  );
};

export default Welcome;

// const Container = styled.div``;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 98px;
`;

const ImgContainer = styled.div`
  padding-top: 87px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeImg1 = styled.img``;

const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 752px;
  height: 752px;
`;
