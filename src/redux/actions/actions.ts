import {nanoid} from '@reduxjs/toolkit';
import * as types from './actionTypes';

export const addMedicine = ({
  name,
  amount,
}: {
  name: string;
  amount: number;
}): types.TypedAddMedicineAction => ({
  type: types.ADD_MEDICINE,
  payload: {
    id: nanoid(),
    name,
    amount,
  },
});

export const updateReminders = ({
  id,
  hour,
}: {
  id: string;
  hour: number;
}): types.TypedUpdateRemindersAction => ({
  type: types.UPDATE_REMINDERS,
  payload: {id, hour},
});

export const updatePickerValue = ({
  value
}: {
  value: number
}): types.TypedUpdatePickerValueAction => ({
  type: types.UPDATE_PICKER_VALUE,
  payload: value,
});
