import {nanoid} from '@reduxjs/toolkit';
import {Medicine} from 'src/types';
import {
  ADD_MEDICINE,
  ASSIGN_TIME,
  UNASSIGN_TIME,
  UPDATE_SELECTED_HOUR,
} from './actionTypes';

export type AddMedicineActionType = {
  type: typeof ADD_MEDICINE;
  payload: Medicine;
};

export type updateAssignedTimeActionType = {
  type: typeof ASSIGN_TIME | typeof UNASSIGN_TIME;
  payload: {
    id: string;
    hour: number;
  };
};

export type UpdateSelectedHour = {
  type: typeof UPDATE_SELECTED_HOUR;
  payload: number;
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
    initialAmount: amount,
    currentAmount: amount,
    intakeHours: [],
  },
});

export const assignTime = ({
  id,
  hour,
}: {
  id: string;
  hour: number;
}): updateAssignedTimeActionType => ({
  type: ASSIGN_TIME,
  payload: {
    id,
    hour,
  },
});

export const unassignTime = ({
  id,
  hour,
}: {
  id: string;
  hour: number;
}): updateAssignedTimeActionType => ({
  type: UNASSIGN_TIME,
  payload: {
    id,
    hour,
  },
});

export const updateSelecterHour = (hour: number) => ({
  type: UPDATE_SELECTED_HOUR,
  payload: hour,
});

export type MedicineActionTypes =
  | AddMedicineActionType
  | updateAssignedTimeActionType
  | UpdateSelectedHour;
