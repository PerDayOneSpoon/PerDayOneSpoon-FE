## ✨ 프로젝트 소개

### 하루에 한 줌씩 🧑🏻‍🌾🌱 꾸준히 습관을 기록해보자! <br><br>

> 하루 한 줌은 체득하고 싶은 습관들을 기록하여 꾸준히 이뤄나갈 수 있도록 도와주는 서비스입니다.<br><br>
> 사용자들이 단순히 자신의 습관을 만드는 것보다 좀 더 재미있게 습관을 형성할 수 있도록 하자는 취지에서 시작된 프로젝트입니다. <br>
> 따라서 내 습관뿐만 아니라 친구의 습관까지 확인하고 독려할 수 있습니다.
<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmtAhG%2FbtrNhOL2bvc%2FnjDlPCDAfNPXkU5q19MNq0%2Fimg.jpg" width="800">

- **[하루한줌 바로가기](https://www.perday-onespoon.com/)<br>**
- **[발표 자료](https://docs.google.com/presentation/d/1u2x1SL4Bt863htJeiWeb8mTztDs20Rne1hU_DN310EU/edit?usp=sharing)<br>**
- **[팀 노션 주소](https://www.notion.so/3-8b744f1d04da4c41812b94df4ad65035)**
- **[시연 영상](https://youtu.be/PDkd_5A_j4k)<br>**
  <br>
  <br>

## 📆 프로젝트 기간 <br>

<ul>
  <li>개발 기간: 2022/08/26 ~ 2022/10/07</li>
  <li>런칭: 2022/10/03</li>
  <li>유저 피드백: 2022/10/03 ~ 2022/10/07</li>
  <li>추가 업데이트: 2022/10/03 ~ 진행 중</li>
</ul>


<br>
<br>

## 📖 서비스 아키텍쳐<br>

![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbg3Vqy%2FbtrNjyBAtmG%2Fz58lk6MglF7kHzwkWhkgBK%2Fimg.png)

<br>
<br>

## 👊 아키텍쳐 도입 배경<br>

### React-Query

<ul>

  <li>리액트에서 서버의 데이터 관리나 데이터 패칭, 캐싱 등을 효율적으로 관리하기 위해 도입했습니다.</li>
  <li>기존에 배웠던 리덕스보다 작성해야 할 보일러 플레이트가 적습니다.</li>
  <li>서버와 클라이언트 사이의 비동기 로직을 보다 쉽게 다룰 수 있습니다.</li>
  <li>유저의 이벤트가 발생하면 자동으로 데이터를 업데이트 해줍니다.</li>
  <li>페이징처리, 지연 로딩, 에러 핸들링 등을 손쉽게 할 수 있습니다.</li>
  <li>리액트 hook과 문법이 비슷하여 별도의 깊은 학습이 필요하지 않습니다.</li>
  
</ul>

### Recoil

<ul>

  <li>리액트에서 서버의 데이터 관리나 데이터 패칭, 캐싱 등을 효율적으로 관리하기 위해 도입</li>
  <li>리덕스라는 대안이 있었으나 하루 한 줌 프로젝트에서 프론트의 상태 관리를 위해 리덕스를 설치한다는 것이 조금 과하게 느껴졌습니다.</li>
  <li>비동기 요청을 중앙에서 관리해야 하는 경우, selector를 통해 간단하게 처리할 수 있습니다.</li>
  <li>리액트 전용 상태 관리 라이브러리로 리액트 hook과 유사한 구조를 가져 쉽게 시작할 수 있습니다.</li>
  <li>recoil은 정식으로 출시된 패키지가 아니어서 안정성의 우려로 현업에서도 잘 쓰이지 않는다고는 하나, 리코일 공식 Github Issue를 위주로 사용성에 문제가 없는지 검토해 보았고,  하루 한 줌 프로젝트에 적용하기에는 안정적이라고 판단하였습니다. 그 결과 프로덕션 환경에서도 특별한 이슈 없이 기능을 구현할 수 있었습니다.</li>
  
</ul>

### Styled-Components  

<ul>

  <li>스타일 컴포넌트를 도입하여 하나의 컴포넌트에 HTML, CSS, JS를 모두 포함하였습니다. 따라서 컴포넌트 단위의 개발에 알맞게 css도 모듈화를 했습니다.</li>
  <li>컴포넌트이므로 className이 겹치지 않아 중복이나 우선 순위 등에 의한 css의 혼선을 줄일 수 있었습니다.</li>
  <li>리액트와 함께 사용하면 props를 활용하여 쉽게 조건부 스타일링이 가능합니다.</li>
  <li>기존에 스타일링 된 컴포넌트에 추가로 스타일링을 할 수 있어 중복된 코드를 줄일 수 있고 분산된 스타일을 일관적으로 관리할 수 있어 유지보수 측면의 비용이 줄어들었습니다.</li>

</ul>

<br>
<br>

## 💖 주요 기능

<details>

  <summary><strong>📅지키고 싶은 습관들을 기록해 캘린더에서 확인할 수 있어요.</strong></summary>

  <br/>

  <ul>
    <li>시간과 캐릭터를 선택할 수 있습니다.</li>
    <li>습관은 3일과 7일 중에 선택할 수 있습니다.</li>
    <li>설정한 시간으로 타이머를 진행하고 습관을 달성할 수 있습니다.</li>
    <li>설정한 습관을 캘린더에서도 확인할 수 있습니다.</li>
    
<br>

  <img src="https://user-images.githubusercontent.com/84265783/194710362-81fb0bb3-8dfe-420e-996b-9fe94b28b3da.gif" width="300">
  <img src="https://user-images.githubusercontent.com/84265783/194705245-90084918-5f83-495f-8804-9bbcd0e6fa8a.gif" width="300">
    <img src="https://user-images.githubusercontent.com/84265783/194713505-59592dd2-dcd3-4d8b-b85f-9462b5940d3d.gif" width="300">
<br>

  </ul>

</details>

<details>

  <summary><strong> 🙌친구를 검색하여 팔로우하고 선택하면 친구가 기록한 습관을 확인할 수 있어요.</strong></summary>

  <br/>

  <ul>

<li>친구의 이메일, 이름 또는 검색코드를 사용하여 검색할 수 있습니다.</li>
<li>캘린더에서 친구가 공개 설정한 습관을 확인할 수 있습니다.</li>
    <br/>

<img src="https://user-images.githubusercontent.com/84265783/194705193-8292ef03-5278-49c2-8176-1591f9f20470.gif" width="300">
<img src="https://user-images.githubusercontent.com/84265783/194705267-d68aebd3-08f6-4757-a9f3-4abd11dfe066.gif" width="300">
    

  </ul>

</details>

<details>

  <summary><strong> 👀친구의 습관에 좋아요와 댓글을 달아 소통할 수 있어요!</strong></summary>

  <br/>

  <ul>

  <li>친구가 어떤 습관을 했는지 둘러보고 응원과 코멘트를 남길 수 있습니다.</li>
    <br/>

<img src="https://user-images.githubusercontent.com/84265783/194709252-57c689ea-0399-4a0f-a639-9fa06cd8e618.gif" width="300">

  </ul>

</details>

<details>

  <summary><strong>👫친구에게 보여주고 싶지 않은 습관들은 프라이빗 설정으로 숨길 수 있어요!</strong></summary>

<br/>

<ul>
  <li>프라이빗을 설정한 습관은 친구들이 캘린더에서 볼 수 없습니다.</li>
  <br />
  
<img src="https://user-images.githubusercontent.com/84265783/194713335-245c547b-7203-4546-97d2-92d842239e8d.gif" width="300">

</ul>

</details>

<details>

  <summary><strong>🏅뱃지들은 어떻게 얻는지 비밀..! 서비스를 이용하면서 하나씩 얻어가는 재미를 느껴보세요!</strong></summary>

  <br/>

  <ul>

<li>얻은 뱃지들은 이미지와 함께 언제 획득했는지 알 수 있습니다.</li>
<li>얻지 않은 뱃지들은 물음표 모양의 뱃지와 함께 힌트를 제공합니다.</li>
    <br/>    

<img src="https://user-images.githubusercontent.com/84265783/194710480-997ca3db-83e9-4712-a59a-e0154a1dd91e.gif" width="300">
    <br>

  </ul>

</details>

<details>

  <summary><strong>📢실시간으로 알림을 받을 수 있어요!</strong></summary>

  <br/>

  <ul>

  <li>뱃지 획득, 댓글, 좋아요, 습관 달성 시 실시간으로 알림을 받을 수 있습니다.</li>
    <br/>

<img src="https://user-images.githubusercontent.com/84265783/194705255-4b4a48fc-f99b-4e1d-ab42-25aed71f6070.gif" width="300">
<img src="https://user-images.githubusercontent.com/84265783/194705258-24af8f5a-8ffc-463c-8f7d-0f8546e2d238.gif" width="300">

  </ul>

</details>

<details>

  <summary><strong>🙍‍♂️내 프로필을 편집할 수 있어요!</strong></summary>

  <br/>

  <ul>

  <li>사진과 이름, 상태메시지를 변경할 수 있습니다.</li>
  <li>친구들의 상태메시지는 팔로우 또는 팔로워 목록에서 확인할 수 있습니다.</li>
    <br/>

<img src="https://user-images.githubusercontent.com/84265783/194712944-8d4b2dc3-5897-46f2-ac3d-c590dda5df3c.gif" width="300">
    <img src="https://user-images.githubusercontent.com/84265783/194710374-d72647b4-ac21-45ff-b107-3d252be5239d.gif" width="300">

  </ul>

</details>

<br>
<br>

## 👪 TEAM 소개

|                                                           [김민섭](https://github.com/alstjq8251) 리더                                                           |                                                                              [박민혁](https://github.com/Park-Seaweed)                                                                              |                                                      [최명순](https://github.com/roy656)                                                      |                                              [전소연](https://github.com/soyeon102) 부리더                                              |                                                                               [배지영](https://github.com/BaejiGongju)                                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                <img src="https://img.shields.io/badge/Back end-fcfd82?style=for-the-badge&logo=&logoColor=white">                                |                                                 <img src="https://img.shields.io/badge/Back end-fcfd82?style=for-the-badge&logo=&logoColor=white">                                                  |                      <img src="https://img.shields.io/badge/Back end-fcfd82?style=for-the-badge&logo=&logoColor=white">                       |                   <img src="https://img.shields.io/badge/front end-fcfd82?style=for-the-badge&logo=&logoColor=white">                   |                                                 <img src="https://img.shields.io/badge/front end-fcfd82?style=for-the-badge&logo=&logoColor=white">                                                  |
| ![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDO9Ma%2FbtrNhOrVyfo%2F0tAlwnBSxOvKYDMD682Zik%2Fimg.png) | ![KakaoTalk_Photo_2022-03-30-14-34-07](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzR6lR%2FbtrNjzHoynR%2FI4iKHEHRzPhXzKSm8xWxL0%2Fimg.png) | ![KakaoTalk_Photo_2022-03-30-14-41-33](https://user-images.githubusercontent.com/79740505/161509182-6a56457f-b0e6-45f0-b40e-d95cbf48619c.png) | ![KakaoTalk_Photo_2022-03-30-14-41-33](https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2022-09-29-22-08-14.png) | ![KakaoTalk_Photo_2022-03-30-14-41-33](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcb1y70%2FbtrNjz1HUuc%2FeMbRbc12c8KQWzWLGTWKsK%2Fimg.png) |

<br>

## 🔧 기술 스택

### 💻 백엔드

<br>
<br>

 <p align="center">
 <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
 <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
 <img src="https://img.shields.io/badge/-Springboot-6DB33F?style=for-the-badge&logo=Springboot&logoColor=white">
 <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
 <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon CloudWatch-FF4F8B?style=for-the-badge&logo=Amazon CloudWatch&logoColor=white">
 <img src="https://img.shields.io/badge/Apache JMeter-D22128?style=for-the-badge&logo=Apache JMeter&logoColor=white">
 <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
 <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
 <img src="https://img.shields.io/badge/QueryDsl-2088FF?style=for-the-badge&logo=&logoColor=white"> 
 <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
 <img src="https://img.shields.io/badge/SSL-721412?style=for-the-badge&logo=SSL&logoColor=white">
 </p>

 <br>
 <br>

### 💻 프론트엔드

<br>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
   <img src="https://img.shields.io/badge/Recoil-2088FF?style=for-the-badge&logo=&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">

  <br>
  <br>

## 🎇 개발 포인트

- [타이머]()
- [코드 스플리팅]()
- [이미지 리사이징]()
- [PWA]()

<br>
<br>

## 🚀 트러블슈팅

- [타이머](https://github.com/PerDayOneSpoon/PerDayOneSpoon-FE/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85----%ED%83%80%EC%9D%B4%EB%A8%B8-%EA%B8%B0%EB%8A%A5)
- [친구 검색 기능](https://github.com/PerDayOneSpoon/PerDayOneSpoon-FE/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85---%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5)
