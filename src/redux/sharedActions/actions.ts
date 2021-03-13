import {
  REMOVE_MEDICINE,
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
} from './actionTypes';

export type removeMedicineActionType = {
  type: typeof REMOVE_MEDICINE;
  payload: {
    id: string;
  };
};

export type assignReminderActionType = {
  type: typeof ASSIGN_REMINDER;
  payload: {
    medicineId: string;
    hour: number;
  };
};

export type unassignReminderActionType = {
  type: typeof UNASSIGN_REMINDER;
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
}): assignReminderActionType => ({
  type: ASSIGN_REMINDER,
  payload: {
    medicineId,
    hour,
  },
});

export const unassignReminder = ({
  medicineId,
  hour,
}: {
  medicineId: string;
  hour: number;
}): unassignReminderActionType => ({
  type: UNASSIGN_REMINDER,
  payload: {
    medicineId,
    hour,
  },
});
