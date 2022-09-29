// import { useEffect, useState } from 'react';

// const useInterval = (id, play, displayTime) => {
//   // const [totalTime, setTotalTime] = useState(total)

//   useEffect(() => {
//     let interval;
//     if (play) {
//       interval = setInterval(() => {
//         // let data = JSON.parse(localStorage.getItem(`timer${id}`));
//         // let newDpTime = data.displayTime--;
//         // const newData = { ...data, displayTime: newDpTime };
//         // localStorage.setItem(`timer${id}`, JSON.stringify(newData));

//         // if (data.displayTime === 0) {
//         //   const newData = { ...data, isPlay: false };
//         //   return localStorage.setItem(`timer${id}`, JSON.stringify(newData));
//         // }

//         console.log('1초마다 실행???');
//       }, 1000);
//     } else if (!play) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [play]);
// };

// export default useInterval;

// import { useEffect, useState } from 'react';

// const useInterval = (run, dpTime) => {
//   useEffect(() => {
//     let interval;
//     if (run) {
//       interval = setInterval(() => {
//         // setDisplayTime((prev) => prev - 1);
//         let data = JSON.parse(localStorage.getItem('timer'));
//         // let newDpTime = --;

//         console.log('newDpTime!!!', (data.displayTime -= 1));
//         // const newData = { ...data, displayTime: newDpTime };
//         // localStorage.setItem('timer', JSON.stringify(newData));

//         // if (data.displayTime === 0) {
//         //   const newData = { ...data, isPlay: false };
//         //   return localStorage.setItem('timer', JSON.stringify(newData));
//         // }

//         console.log('실행되냐');
//       }, 1000);
//     } else if (!run) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [run]);
// };

// export default useInterval;

import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const intervalRef = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = setInterval(() => callbackRef.current(), delay);
    }
    return () => clearInterval(intervalRef.current);
  }, [delay]);
};

export default useInterval;
