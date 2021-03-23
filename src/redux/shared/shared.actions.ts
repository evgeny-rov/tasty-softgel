import { Medicine } from "src/types";

export const REMOVE_MEDICINE = 'REMOVE_MEDICINE';
export const ASSIGN_REMINDER = 'ASSIGN_REMINDER';
export const UNASSIGN_REMINDER = 'UNASSIGN_REMINDER';

export type TypedRemoveMedicineAction = {
  type: typeof REMOVE_MEDICINE;
  payload: Medicine;
};

export type TypedUpdateRemindersAction = {
  type: typeof ASSIGN_REMINDER | typeof UNASSIGN_REMINDER;
  payload: {
    medicineId: string;
    hour: number;
  };
};

export const assignReminder = ({
  medicineId,
  hour,
}: {
  medicineId: string;
  hour: number;
}): TypedUpdateRemindersAction => ({
  type: ASSIGN_REMINDER,
  payload: {medicineId, hour},
});

export const unassignReminder = ({
  medicineId,
  hour,
}: {
  medicineId: string;
  hour: number;
}): TypedUpdateRemindersAction => ({
  type: UNASSIGN_REMINDER,
  payload: {medicineId, hour},
});