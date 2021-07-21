export default (prevDateInMs: number, newDateInMs: number) => {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const prevDateHours = new Date(prevDateInMs).getHours();
  const nextDateHours = new Date(newDateInMs).getHours();

  return (
    prevDateHours > nextDateHours ||
    Math.abs(prevDateInMs - newDateInMs) >= oneDayInMs
  );
};
