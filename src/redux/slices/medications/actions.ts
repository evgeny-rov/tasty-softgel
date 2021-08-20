import * as TYPES from './actionTypes';
import type {Medication} from 'src/types';
import type {AppDispatch, RootState} from 'src/redux/store';
import {
  getConfirmableMedicationsByHourId,
  getHourIdNow,
} from '../scheduled_medications/selectors';

export type addMedicationAction = {
  type: typeof TYPES.ADD_MEDICATION;
  payload: {id: string; name: string; quantity: number};
};

export type removeMedicationAction = {
  type: typeof TYPES.REMOVE_MEDICATION;
  payload: {id: string};
};

export type updateMedicationAction = {
  type: typeof TYPES.UPDATE_MEDICATION;
  payload: Medication;
};

export type confirmConsumptionAction = {
  type:
    | typeof TYPES.CONFIRM_CONSUMPTION
    | typeof TYPES.CONFIRM_CONSUMPTION_UNPLANNED;
  payload: {
    timestamp: number;
    medications: Medication[];
    hourId: number;
  };
};

export type MedicationsActions =
  | addMedicationAction
  | removeMedicationAction
  | updateMedicationAction
  | confirmConsumptionAction;

export const addMedication = (medication: Medication): addMedicationAction => ({
  type: TYPES.ADD_MEDICATION,
  payload: medication,
});

export const removeMedication = ({
  medicationId,
}: {
  medicationId: string;
}): removeMedicationAction => ({
  type: TYPES.REMOVE_MEDICATION,
  payload: {id: medicationId},
});

export const updateMedication = (
  medication: Medication,
): updateMedicationAction => ({
  type: TYPES.UPDATE_MEDICATION,
  payload: medication,
});

export const confirmConsumption = (
  hourId: number,
  medications: Medication[],
  isUnplanned: boolean = false,
): confirmConsumptionAction => {
  const timestamp = Date.now();
  const payload = {
    hourId,
    medications,
    timestamp,
  };

  return {
    type: isUnplanned
      ? TYPES.CONFIRM_CONSUMPTION_UNPLANNED
      : TYPES.CONFIRM_CONSUMPTION,
    payload,
  };
};

export const confirmConsumptionThunk = (hourId: number): any => (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const state = getState();
  const medications = getConfirmableMedicationsByHourId(state)[hourId];
  const isUnplanned = hourId > getHourIdNow(state);

  dispatch(confirmConsumption(hourId, medications, isUnplanned));
};
