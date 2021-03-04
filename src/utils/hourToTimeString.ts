export default (hour: number) => {
  return `${hour}:00`.padStart(5, '0');
};
