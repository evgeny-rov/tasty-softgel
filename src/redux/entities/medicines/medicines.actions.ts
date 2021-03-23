import { nanoid } from "@reduxjs/toolkit";

export const ADD_MEDICINE = 'ADD_MEDICINE';
export const EDIT_MEDICINE = 'EDIT_MEDICINE';

export type TypedAddMedicineAction = {
  type: typeof ADD_MEDICINE;
  payload: {id: string; name: string; amount: number};
};

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