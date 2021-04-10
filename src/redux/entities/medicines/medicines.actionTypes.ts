import { Medicine } from "src/types";

export const ADD_MEDICINE = 'ADD_MEDICINE';
export const EDIT_MEDICINE = 'EDIT_MEDICINE';
export const REMOVE_MEDICINE = 'REMOVE_MEDICINE';

export type TypedAddMedicineAction = {
  type: typeof ADD_MEDICINE;
  payload: {id: string; name: string; amount: number};
};

export type TypedRemoveMedicineAction = {
  type: typeof REMOVE_MEDICINE;
  payload: Medicine;
};
