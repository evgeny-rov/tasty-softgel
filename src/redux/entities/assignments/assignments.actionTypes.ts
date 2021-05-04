export const ASSIGN_MEDICINE = 'ASSIGN_MEDICINE';
export const UNASSIGN_MEDICINE = 'UNASSIGN_MEDICINE';

export type TypedUpdateAssignmentsAction = {
  type: typeof ASSIGN_MEDICINE | typeof UNASSIGN_MEDICINE;
  payload: {
    medicineId: string;
    hour: number;
  };
};
