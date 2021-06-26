import {Dispatch, Middleware} from 'redux';
import {
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from 'src/redux/entities/assignments/assignments.actionTypes';

import {
  handleConfirmationAction,
  handleUpdateMedicine,
  handleNewAssignment,
  handleRemoveAssignment,
} from './notifications.manager';

import {
  TypedUpdateMedicineAction,
  UPDATE_MEDICINE,
} from 'src/redux/entities/medicines/medicines.actionTypes';

import {
  CONFIRM_CONSUMPTION,
  TypedConfirmConsumptionAction,
} from 'src/redux/entities/consumptions/consumptions.actionTypes';
import {AppStateType} from 'src/types';

type ExpectedActions =
  | TypedAddAssignmentAction
  | TypedRemoveAssignmentAction
  | TypedConfirmConsumptionAction
  | TypedUpdateMedicineAction;

const triggerActionTypes = [
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  CONFIRM_CONSUMPTION,
  UPDATE_MEDICINE,
] as const;

const useHandler = (action: ExpectedActions, state: AppStateType) => {
  switch (action.type) {
    case ADD_ASSIGNMENT: {
      handleNewAssignment(action.payload, state);
      break;
    }
    case REMOVE_ASSIGNMENT: {
      handleRemoveAssignment(action.payload, state);
      break;
    }
    case CONFIRM_CONSUMPTION: {
      handleConfirmationAction(action.payload, state);
      break;
    }
    case UPDATE_MEDICINE: {
      handleUpdateMedicine(action.payload, state);
      break;
    }
    default: {
      return null;
    }
  }
};

const testMiddleware: Middleware<Dispatch, AppStateType> = ({getState}) => (
  next,
) => (action: ExpectedActions) => {
  const result = next(action);

  if (triggerActionTypes.includes(action.type)) useHandler(action, getState());

  return result;
};

export default testMiddleware;
