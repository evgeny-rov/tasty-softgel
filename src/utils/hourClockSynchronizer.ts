const MS_IN_HOUR = 60 * 60 * 1000;
const MAX_TICK_TIMEOUT_IN_MS = 30 * 1000;

const hourClockSynchronizer = (
  requestHour: () => number,
  refreshClock: () => void,
) => {
  let timerId: NodeJS.Timeout | null = null;

  const tick = () => {
    const timeNow = new Date();
    const msToNextHour = MS_IN_HOUR - (timeNow.getTime() % MS_IN_HOUR);
    const storedHour = requestHour();

    if (storedHour !== timeNow.getHours()) refreshClock();

    const nextTick =
      msToNextHour > MAX_TICK_TIMEOUT_IN_MS
        ? MAX_TICK_TIMEOUT_IN_MS
        : msToNextHour;

    timerId = setTimeout(tick, nextTick);
  };

  const start = () => {
    console.log('clock start')
    refreshClock();
    timerId && clearTimeout(timerId);
    tick();
  };

  const stop = () => {
    console.log('clock stop')
    timerId && clearTimeout(timerId);
  };

  return {start, stop};
};

export default hourClockSynchronizer;
