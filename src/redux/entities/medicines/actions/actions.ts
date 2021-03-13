import {nanoid} from '@reduxjs/toolkit';
import {ADD_MEDICINE} from './actionTypes';

export type AddMedicineActionType = {
  type: typeof ADD_MEDICINE;
  payload: {id: string; name: string; amount: number};
};

export const addMedicine = ({
  name,
  amount,
}: {
  name: string;
  amount: number;
}): AddMedicineActionType => ({
  type: ADD_MEDICINE,
  payload: {
    id: nanoid(),
    name,
    amount: amount,
  },
});
