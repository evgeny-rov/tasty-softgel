export type Medicine = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  reminders: number[];
};

export type MedicinesState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
};

export type Reminder = {
  hour: number;
  medicinesIds: string[];
};

export type RemindersState = {
  allHours: number[];
  byHour: {
    [hour: number]: Reminder;
  };
};

export type AppState = {
  medicines: MedicinesState;
  reminders: RemindersState;
  pickerSelectedValue: number;
};
