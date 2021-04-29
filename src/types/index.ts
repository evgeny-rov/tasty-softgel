export type Medicine = {
  id: string;
  name: string;
  count: number;
  assignments: number[];
};

export type MedicinesState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
};

export type Assignment = {
  hour: number;
  medicinesIds: string[];
};

export type AssignmentsState = {
  allHours: number[];
  byHour: {
    [hour: number]: Assignment;
  };
};

export type ConsumptionsState = {
  currentHour: number;
  confirmedHours: number[];
  lastConfirmationAt: number;
};

export type AppStateType = {
  medicines: MedicinesState;
  assignments: AssignmentsState;
  consumptions: ConsumptionsState;
};
