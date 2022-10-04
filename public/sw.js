// navigator (브라우저)에 serviceWorker 기능이 있는지 확인
if ('serviceWorker' in navigator) {
  // 서비스워커 설치시 DOM 블로킹을 막아준다.
  window.addEventListener('load', function () {
    // 서비스워커를 register 하면 promise를 반환한다.
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('서비스 워커가 등록되었다.');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
