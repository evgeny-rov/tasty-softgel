export type Medicine = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  reminders: number[];
};

export type Reminder = {
  hour: number;
  medicines: string[];
};

export type Picker = number;

export type MedicinesState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
};

export type RemindersState = {
  allHours: number[];
  byHour: {
    [hour: number]: Reminder;
  };
};

export type PickerState = {
  value: Picker;
}

export type AppState = {
  medicines: MedicinesState;
  reminders: RemindersState;
  picker: PickerState;
};
