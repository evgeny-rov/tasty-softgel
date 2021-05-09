import {nanoid} from '@reduxjs/toolkit';
import {
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from './assignments.actionTypes';

export const addAssignment = ({
  medicineId,
  hour,
}: {
  medicineId: string;
  hour: number;
}): TypedAddAssignmentAction => ({
  type: ADD_ASSIGNMENT,
  payload: {id: nanoid(), medicineId, hour},
});

export const removeAssignment = ({
  id,
}: {
  id: string;
}): TypedRemoveAssignmentAction => ({
  type: REMOVE_ASSIGNMENT,
  payload: {id},
});
