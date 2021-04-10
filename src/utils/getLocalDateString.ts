export default (timeInMs: number) => {
  return new Date(timeInMs).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
