import {
  createReminder,
  cancelReminder,
  issueLowSupplyNotifications,
  cancelAllLocalNotifications,
} from './api';
import {HOURS_IN_A_DAY} from '@constants/';
import {
  getConfirmableMedicationsByHourId,
  getConfirmedHourIds,
} from 'src/redux/slices/scheduled_medications/selectors';
import getDateFromHour from '@utils/getDateFromHour';

import type {RootState} from 'src/redux/store';
import type {confirmConsumptionAction} from 'src/redux/slices/medications/actions';

export const handleMedicationsUpdates = (state: RootState) => {
  const confirmableMedicationsByHour = getConfirmableMedicationsByHourId(state);

  for (const hour of HOURS_IN_A_DAY) {
    const isHourActive = confirmableMedicationsByHour[hour]?.length > 0;

    if (isHourActive) {
      const isConfirmedForToday = getConfirmedHourIds(state).includes(hour);
      const isLateForToday = hour <= state.scheduled_medications.hourIdNow;

      const shouldDelayTillNextDay = isConfirmedForToday || isLateForToday;

      const scheduledDate = getDateFromHour(hour, shouldDelayTillNextDay);

      createReminder(scheduledDate);
    } else {
      cancelReminder(hour);
    }
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
