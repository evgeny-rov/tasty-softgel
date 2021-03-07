import {nanoid} from '@reduxjs/toolkit';
import {ADD_MEDICINE, TOGGLE_ASSIGNED_TIME} from './actionTypes';

export type Medicine = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
};

export type AddMedicineActionType = {
  type: typeof ADD_MEDICINE;
  payload: Medicine;
};

export type toggleAssignedTimeActionType = {
  type: typeof TOGGLE_ASSIGNED_TIME;
  payload: {
    id: string;
    hour: number;
  };
};

export type MedicineActionTypes =
  | AddMedicineActionType
  | toggleAssignedTimeActionType;

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
    initialAmount: amount,
    currentAmount: amount,
  },
});

export const toggleAssignedTime = ({
  id,
  hour,
}: {
  id: string;
  hour: number;
}): toggleAssignedTimeActionType => ({
  type: TOGGLE_ASSIGNED_TIME,
  payload: {
    id,
    hour,
  },
});
