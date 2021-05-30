export type Medicine = {
  id: string;
  name: string;
  count: number;
};

export type MedicinesState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
};

export type Assignment = {
  id: string;
  hour: number;
  medicineId: string;
};

export type AssignmentsState = {
  byId: {
    [id: string]: Assignment;
  };
};

export type ConsumptionsState = {
  currentHour: number;
  confirmedHours: number[];
  lastConfirmationAt: number;
};

export type ModalMedicineState = {
  isVisible: boolean;
  data: Medicine | null;
};

export type AppStateType = {
  medicines: MedicinesState;
  assignments: AssignmentsState;
  consumptions: ConsumptionsState;
  modal_medicine: ModalMedicineState;
};
