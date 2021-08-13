import {AppState} from 'react-native';

const MS_IN_HOUR = 60 * 60 * 1000;
const MAX_TICK_TIMEOUT_IN_MS = 30 * 1000;

const hourClockSynchronizer = (
  requestHour: () => number,
  hoursOutOfSyncCallback: () => void,
) => {
  let timerId: NodeJS.Timeout | null = null;

  const tick = () => {
    const timeNow = new Date();
    const msToNextHour = MS_IN_HOUR - (timeNow.getTime() % MS_IN_HOUR);
    const storedHour = requestHour();

    if (storedHour !== timeNow.getHours()) hoursOutOfSyncCallback();

    const nextTick =
      msToNextHour > MAX_TICK_TIMEOUT_IN_MS
        ? MAX_TICK_TIMEOUT_IN_MS
        : msToNextHour;

    timerId = setTimeout(tick, nextTick);
  };

  const start = () => {
    timerId && clearTimeout(timerId);
    tick();
  };

  const stop = () => {
    timerId && clearTimeout(timerId);
  };

  AppState.addEventListener('change', (state) => {
    state === 'active' ? start() : stop();
  });

  start();
};

export default hourClockSynchronizer;
