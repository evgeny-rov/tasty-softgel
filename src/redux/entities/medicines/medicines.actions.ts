import {nanoid} from '@reduxjs/toolkit';
import {Medicine} from 'src/types';
import {
  ADD_MEDICINE,
  REMOVE_MEDICINE,
  TypedAddMedicineAction,
  TypedRemoveMedicineAction,
} from './medicines.actionTypes';

export const addMedicine = ({
  name,
  amount,
}: {
  name: string;
  amount: number;
}): TypedAddMedicineAction => ({
  type: ADD_MEDICINE,
  payload: {
    id: nanoid(),
    name,
    amount,
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