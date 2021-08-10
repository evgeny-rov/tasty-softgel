import * as TYPES from './actionTypes';
import type {DailyMedication} from 'src/types';
import {AppDispatch, RootState} from 'src/redux/store';
import isDayPassed from '@utils/isDayPassed';

export type toggleScheduledDailyMedicationStatusAction = {
  type:
    | typeof TYPES.ADD_SCHEDULED_DAILY_MEDICATION
    | typeof TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION;
  payload: DailyMedication;
};

export type scheduledDailyMedicationsRefreshAction = {
  type:
    | typeof TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH
    | typeof TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH_DAY;
  payload: {hourId: number};
};

export type ScheduledDailyMedicationsActions =
  | toggleScheduledDailyMedicationStatusAction
  | scheduledDailyMedicationsRefreshAction;

export const toggleScheduledDailyMedicationStatus = ({
  medicationId,
  hourId,
  toRemove,
}: {
  medicationId: string;
  hourId: number;
  toRemove: boolean;
}): toggleScheduledDailyMedicationStatusAction => ({
  type: toRemove
    ? TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION
    : TYPES.ADD_SCHEDULED_DAILY_MEDICATION,
  payload: {medicationId, hourId},
});

export const scheduledDailyMedicationsRefreshThunk = (): any => (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const currentTime = new Date();
  const lastConfirmationAt = getState().scheduled_medications
    .lastConfirmationAt;

  dispatch({
    type: isDayPassed(lastConfirmationAt, currentTime.getTime())
      ? TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH_DAY
      : TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH,
    payload: {
      hourId: currentTime.getHours(),
    },
  });
};
