import {AppState} from 'react-native';
import hourClockSynchronizer from '@utils/hourClockSynchronizer';
import {scheduledDailyMedicationsRefreshThunk} from '../slices/scheduled_medications/actions';

import type {AppDispatch, RootState} from './store';

const onStartUp = ({
  dispatch,
  getState,
}: {
  dispatch: AppDispatch;
  getState: () => RootState;
}) => {
  const getStoredHour = () => getState().scheduled_medications.hourIdNow;
  const refreshDailySchedule = () =>
    dispatch(scheduledDailyMedicationsRefreshThunk());

  const hourClock = hourClockSynchronizer(getStoredHour, refreshDailySchedule);
  AppState.currentState === 'active' && hourClock.start();

  AppState.addEventListener('change', (state) =>
    state === 'active' ? hourClock.start() : hourClock.stop(),
  );
};

export {onStartUp};
