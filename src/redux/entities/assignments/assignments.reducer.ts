import {AssignmentsState} from 'src/types';
import {
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from './assignments.actionTypes';
import {
  REMOVE_MEDICINE,
  TypedRemoveMedicineAction,
} from '../medicines/medicines.actionTypes';
import {pickBy} from 'lodash';

type TypedActions =
  | TypedAddAssignmentAction
  | TypedRemoveAssignmentAction
  | TypedRemoveMedicineAction;

const initialState: AssignmentsState = {
  byId: {},
};

export default (
  state = initialState,
  action: TypedActions,
): AssignmentsState => {
  switch (action.type) {
    case ADD_ASSIGNMENT: {
      const {id, hour, medicineId} = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {id, medicineId, hour},
        },
      };
    }
    case REMOVE_ASSIGNMENT: {
      const {id} = action.payload;

      return {
        ...state,
        byId: pickBy(state.byId, (assignment) => assignment.id !== id),
      };
    }
    case REMOVE_MEDICINE: {
      const {id: medicineId} = action.payload;

      return {
        ...state,
        byId: pickBy(
          state.byId,
          (assignment) => assignment.medicineId !== medicineId,
        ),
      };
    }
    default: {
      return state;
    }
  }
};
