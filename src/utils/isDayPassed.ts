export default (previousDateInMs: number) => {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const timeNow = Date.now();

  const previousDateHours = new Date(previousDateInMs).getHours();
  const hoursNow = new Date(timeNow).getHours();

  return (
    previousDateHours > hoursNow ||
    Math.abs(previousDateInMs - timeNow) >= oneDayInMs
  );
};
