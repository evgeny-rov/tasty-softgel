import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import * as TYPES from './actionTypes';
import isDayPassed from '@utils/isDayPassed';
import type {DailyMedication} from 'src/types';
import {AppDispatch, RootState} from 'src/redux/store';

const SCHEDULED_MEDICATION_ID_PREFIX = 'scheduled-';

export type addScheduledDailyMedicationAction = {
  type: typeof TYPES.ADD_SCHEDULED_DAILY_MEDICATION;
  payload: DailyMedication;
};

export type removeScheduledDailyMedicationAction = {
  type: typeof TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION;
  payload: {id: string};
};

export type scheduledDailyMedicationsRefreshAction = {
  type:
    | typeof TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH
    | typeof TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH_DAY;
  payload: {hourId: number};
};

export type ScheduledDailyMedicationsActions =
  | addScheduledDailyMedicationAction
  | removeScheduledDailyMedicationAction
  | scheduledDailyMedicationsRefreshAction;

export const addScheduledDailyMedication = ({
  medicationId,
  hourId,
}: {
  medicationId: string;
  hourId: number;
}): addScheduledDailyMedicationAction => {
  return {
    type: TYPES.ADD_SCHEDULED_DAILY_MEDICATION,
    payload: {
      id: SCHEDULED_MEDICATION_ID_PREFIX + uuidv4(),
      medicationId,
      hourId,
    },
  };
};

export const removeScheduledDailyMedication = ({
  id,
}: {
  id: string;
}): removeScheduledDailyMedicationAction => {
  return {
    type: TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION,
    payload: {
      id,
    },
  };
};

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
