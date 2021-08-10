import {Medication} from 'src/types';
import * as TYPES from './actionTypes';

export type showMedicationModalAction = {
  type: typeof TYPES.SHOW_MEDICATION_MODAL;
  payload: {data: Medication | null};
};

export type hideMedicationModalAction = {
  type: typeof TYPES.HIDE_MEDICATION_MODAL;
  payload: {};
};

export type ModalMedicationActions =
  | showMedicationModalAction
  | hideMedicationModalAction;

export const showMedicationModal = (
  data: Medication | null = null,
): showMedicationModalAction => ({
  type: TYPES.SHOW_MEDICATION_MODAL,
  payload: {data},
});

export const hideMedicationModal = (): hideMedicationModalAction => ({
  type: TYPES.HIDE_MEDICATION_MODAL,
  payload: {},
});
