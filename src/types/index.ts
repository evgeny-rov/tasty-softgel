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

export type SystemState = {
  currentHour: number;
  isDataUpdated: boolean;
  lastConfirmationAt: number;
};

export type AppStateType = {
  medicines: MedicinesState;
  reminders: RemindersState;
  system: SystemState;
};
