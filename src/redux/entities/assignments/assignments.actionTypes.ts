export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT';
export const REMOVE_ASSIGNMENT = 'REMOVE_ASSIGNMENT';

export type TypedAddAssignmentAction = {
  type: typeof ADD_ASSIGNMENT;
  payload: {
    id: string;
    medicineId: string;
    hour: number;
  };
};

export type TypedRemoveAssignmentAction = {
  type: typeof REMOVE_ASSIGNMENT;
  payload: {
    id: string;
  };
};
