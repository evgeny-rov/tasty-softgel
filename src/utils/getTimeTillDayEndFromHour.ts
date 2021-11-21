const MS_IN_A_DAY = 1000 * 60 * 60 * 24;

export default (hourId: number) => {
  const msFromHour = 1000 * 60 * 60 * hourId;

  return MS_IN_A_DAY - msFromHour;
};
