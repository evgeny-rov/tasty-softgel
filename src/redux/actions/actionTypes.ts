export const ADD_MEDICINE = 'ADD_MEDICINE';
export const UPDATE_MEDICINE = 'UPDATE_MEDICINE';
export const REMOVE_MEDICINE = 'REMOVE_MEDICINE';
export const UPDATE_REMINDERS = 'UPDATE_REMINDERS';
export const UPDATE_PICKER_VALUE = 'UPDATE_PICKER_VALUE';

export type TypedAddMedicineAction = {
  type: typeof ADD_MEDICINE;
  payload: {id: string; name: string; amount: number};
};

export type TypedUpdateRemindersAction = {
  type: typeof UPDATE_REMINDERS;
  payload: {
    id: string;
    hour: number;
  };
};

export type TypedUpdatePickerValueAction = {
  type: typeof UPDATE_PICKER_VALUE;
  payload: number;
};