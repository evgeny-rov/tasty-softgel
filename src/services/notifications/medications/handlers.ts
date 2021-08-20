import {
  createReminder,
  cancelReminder,
  issueLowSupplyNotifications,
  cancelAllLocalNotifications,
} from './api';
import {HOURS_IN_A_DAY} from '@constants/';
import {getConfirmableMedicationsByHourId} from 'src/redux/slices/scheduled_medications/selectors';

import type {RootState} from 'src/redux/store';
import type {confirmConsumptionAction} from 'src/redux/slices/medications/actions';

export const handleMedicationsUpdates = (state: RootState) => {
  const confirmableMedicationsByHour = getConfirmableMedicationsByHourId(state);

  for (const hour of HOURS_IN_A_DAY) {
    const isNonEmpty = confirmableMedicationsByHour[hour]?.length > 0;

    isNonEmpty ? createReminder(hour) : cancelReminder(hour);
  }
};

export const handleConfirmationAction = (
  payload: confirmConsumptionAction['payload'],
  state: RootState,
) => {
  const {medications, hourId} = payload;

  cancelReminder(hourId);
  issueLowSupplyNotifications(medications);
  handleMedicationsUpdates(state);
};

export const handleStateChange = (
  isNextStateActive: boolean,
  state: RootState,
) => {
  if (isNextStateActive) {
    handleMedicationsUpdates(state);
  } else {
    cancelAllLocalNotifications();
  }
};
