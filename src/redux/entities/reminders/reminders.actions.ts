import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from './reminders.actionTypes';

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
