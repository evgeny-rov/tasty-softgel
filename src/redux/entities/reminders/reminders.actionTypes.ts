export const ASSIGN_REMINDER = 'ASSIGN_REMINDER';
export const UNASSIGN_REMINDER = 'UNASSIGN_REMINDER';

export type TypedUpdateRemindersAction = {
  type: typeof ASSIGN_REMINDER | typeof UNASSIGN_REMINDER;
  payload: {
    medicineId: string;
    hour: number;
  };
};
