export const stringToTime = (str) => {
  let totalTime = 0;

  str?.split(':').forEach((time, i) => {
    if (i === 0) totalTime += parseInt(time) * 60 * 60;
    if (i === 1) totalTime += parseInt(time) * 60;
    if (i === 2) totalTime += parseInt(time);
  });
  return totalTime;
};
