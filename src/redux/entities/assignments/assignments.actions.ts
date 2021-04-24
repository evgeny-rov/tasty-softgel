import {
  ASSIGN_MEDICINE,
  UNASSIGN_MEDICINE,
  TypedUpdateAssignmentsAction,
} from './assignments.actionTypes';

export const assignMedicine = ({
  medicineId,
  hour,
}: {
  medicineId: string;
  hour: number;
}): TypedUpdateAssignmentsAction => ({
  type: ASSIGN_MEDICINE,
  payload: {medicineId, hour},
});

export const unassignMedicine = ({
  medicineId,
  hour,
}: {
  medicineId: string;
  hour: number;
}): TypedUpdateAssignmentsAction => ({
  type: UNASSIGN_MEDICINE,
  payload: {medicineId, hour},
});
