export const timerFormat = (time) => {
  const format = (num) => (num < 10 ? `0${num}` : String(num));

  const sec = time;
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = sec - hours * 3600 - minutes * 60;
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};
