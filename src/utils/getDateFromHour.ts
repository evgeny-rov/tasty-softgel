export default (hour: number, shouldDelayTillNextDay: boolean) => {
  const newDate = new Date();
  newDate.setHours(hour, 0, 0, 0);
  const delaydDays = shouldDelayTillNextDay ? 1 : 0;
  newDate.setDate(newDate.getDate() + delaydDays);

  return newDate;
};
