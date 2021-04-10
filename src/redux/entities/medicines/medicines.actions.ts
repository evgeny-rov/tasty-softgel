import {nanoid} from '@reduxjs/toolkit';
import {ADD_MEDICINE, TypedAddMedicineAction} from './medicines.actionTypes';

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
