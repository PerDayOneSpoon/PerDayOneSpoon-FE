import styled from 'styled-components';
import { useState, useRef } from 'react';
import CommonText from './elements/CommonText';
import { colors } from '../theme/theme';
import welcomeImg1 from '../assets/imgs/welcome1.png';
import welcomeImg3 from '../assets/imgs/welcome3.png';
import welcomeImg4 from '../assets/imgs/welcome4.png';
import welcomeImg5 from '../assets/imgs/welcome5.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ReactComponent as IconLeft } from '../assets/icons/icon-left.svg';
import { ReactComponent as IconRight } from '../assets/icons/icon-right.svg';

const Welcome = () => {
  const [pagination, setPagination] = useState(1);
  const prevNavi = useRef(null);
  const nextNavi = useRef(null);

  return (
    <Container>
      <StSwiper
        navigation={{ prevEl: prevNavi.current, nextEl: nextNavi.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevNavi.current;
          swiper.params.navigation.nextEl = nextNavi.current;
        }}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={(e) => setPagination(e.activeIndex + 1)}
        modules={[Navigation]}
      >
        <StPrev ref={prevNavi} page={pagination}>
          <IconLeft />
        </StPrev>
        <StNext ref={nextNavi} page={pagination}>
          <IconRight />
        </StNext>
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
            <WelcomeImg src={welcomeImg1} />
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
            <WelcomeImg src={welcomeImg3} />
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
              크롬에서 웹 앱을 <br />
              다운받아 사용해보세요!
            </CommonText>
          </TextContainer>
          <ImgContainer>
            <WelcomeImg src={welcomeImg4} />
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
              친구의 습관에 <br />
              댓글을 달아보세요!
            </CommonText>
          </TextContainer>
          <ImgContainer>
            <WelcomeImg src={welcomeImg5} />
          </ImgContainer>
        </SwiperSlide>
      </StSwiper>
      <NaviContainer>
        {pagination < 5 && (
          <StNavi pagination={pagination}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i}></div>
            ))}
          </StNavi>
        )}
      </NaviContainer>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`;

const StSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const StPrev = styled.div`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  transform: translateY(-50%);
  display: ${(props) => (props.page !== 1 ? 'flex' : 'none')};
  width: 3.2rem;
  height: 3.2rem;
  z-index: 9;
  cursor: pointer;
`;

const StNext = styled.div`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);
  display: ${(props) => (props.page !== 4 ? 'flex' : 'none')};
  width: 3.2rem;
  height: 3.2rem;
  z-index: 9;
  cursor: pointer;
  img {
    transform: rotate(180deg);
  }
`;

const NaviContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StNavi = styled.div`
  display: flex;
  gap: 0.7rem;
  div {
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${colors.white};
    border-radius: 50%;
  }
  div:nth-child(${(props) => props.pagination}) {
    background-color: ${colors.placeholder};
  }
  z-index: 9;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 14rem;
  left: 4rem;

  line-height: 2.4rem;

  /* width: 100%;
  text-align: center;
  padding-top: 90px; */
`;

const ImgContainer = styled.div`
  /* padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center; */

  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const WelcomeImg = styled.img``;
