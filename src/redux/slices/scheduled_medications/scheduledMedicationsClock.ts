import {AppState} from 'react-native';
import {scheduledDailyMedicationsRefreshThunk} from './actions';
import type {AppDispatch, RootState} from 'src/redux/store';

const MS_IN_HOUR = 60 * 60 * 1000;
const MAX_TICK_TIMEOUT_IN_MS = 30 * 1000;

const scheduledMedicationsClock = (
  getState: () => RootState,
  dispatch: AppDispatch,
) => {
  let timerId: NodeJS.Timeout | null = null;

  const tick = () => {
    const timeNow = new Date();
    const msToNextHour = MS_IN_HOUR - (timeNow.getTime() % MS_IN_HOUR);
    const storedHour = getState().scheduled_medications.hourIdNow;

    storedHour !== timeNow.getHours() &&
      dispatch(scheduledDailyMedicationsRefreshThunk());

    const nextTick =
      msToNextHour > MAX_TICK_TIMEOUT_IN_MS
        ? MAX_TICK_TIMEOUT_IN_MS
        : Math.round(msToNextHour / 2);

    console.log('clock tick', {
      nextTick,
      msToNextHour,
      storedHour,
      sysHour: timeNow.getHours(),
    });
    timerId = setTimeout(tick, nextTick);
  };

  const start = () => {
    timerId && clearTimeout(timerId);
    tick();
    console.log('clock start event');
  };

  const stop = () => {
    timerId && clearTimeout(timerId);
    console.log('clock stopped event');
  };

  AppState.addEventListener('change', (state) => {
    state === 'active' ? start() : stop();
  });

  start();
};

export default scheduledMedicationsClock;
