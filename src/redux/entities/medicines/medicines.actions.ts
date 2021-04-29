import {nanoid} from '@reduxjs/toolkit';
import {Medicine} from 'src/types';
import {
  ADD_MEDICINE,
  REMOVE_MEDICINE,
  UPDATE_MEDICINE,
  TypedAddMedicineAction,
  TypedRemoveMedicineAction,
  TypedUpdateMedicineAction,
} from './medicines.actionTypes';

export const addMedicine = ({
  name,
  count,
}: {
  name: string;
  count: number;
}): TypedAddMedicineAction => ({
  type: ADD_MEDICINE,
  payload: {
    id: nanoid(),
    name,
    count,
  },
});

export const removeMedicine = ({
  medicine,
}: {
  medicine: Medicine;
}): TypedRemoveMedicineAction => ({
  type: REMOVE_MEDICINE,
  payload: medicine,
});

export const updateMedicine = (
  medicine: Medicine,
): TypedUpdateMedicineAction => ({
  type: UPDATE_MEDICINE,
  payload: medicine,
});
