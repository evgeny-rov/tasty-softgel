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
  const onHoursChangedAction = () =>
    dispatch(scheduledDailyMedicationsRefreshThunk());

  hourClockSynchronizer(getStoredHour, onHoursChangedAction);
};

export {onStartUp};
