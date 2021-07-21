import {Dispatch, Middleware} from 'redux';
import {
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from 'src/redux/entities/assignments/assignments.actionTypes';

import {
  handleConfirmationAction,
  handleMedicinesUpdates,
  handleNewAssignment,
  handleRemoveAssignment,
} from '../../services/notifications/notifications.medicines';

import {
  REMOVE_MEDICINE,
  UPDATE_MEDICINE,
  TypedUpdateMedicineAction,
  TypedRemoveMedicineAction,
} from 'src/redux/entities/medicines/medicines.actionTypes';

import {
  CONFIRM_CONSUMPTION,
  TypedConfirmConsumptionAction,
  UNPLANNED_CONFIRM_CONSUMPTION,
} from 'src/redux/entities/daily_assignments/daily_assignments.actionTypes';
import {AppStateType} from 'src/types';

type ExpectedActions =
  | TypedAddAssignmentAction
  | TypedRemoveAssignmentAction
  | TypedConfirmConsumptionAction
  | TypedRemoveMedicineAction
  | TypedUpdateMedicineAction;

const triggerActionTypes = [
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  UNPLANNED_CONFIRM_CONSUMPTION,
  CONFIRM_CONSUMPTION,
  UPDATE_MEDICINE,
  REMOVE_MEDICINE,
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
    case UNPLANNED_CONFIRM_CONSUMPTION:
    case CONFIRM_CONSUMPTION: {
      handleConfirmationAction(action.payload, state);
      break;
    }
    case REMOVE_MEDICINE:
    case UPDATE_MEDICINE: {
      handleMedicinesUpdates(state);
      break;
    }
    default: {
      return null;
    }
  }
};

const medicinesNotificationsMiddleware: Middleware<Dispatch, AppStateType> = ({
  getState,
}) => (next) => (action: ExpectedActions) => {
  const result = next(action);

  if (triggerActionTypes.includes(action.type)) useHandler(action, getState());

  return result;
};

export default medicinesNotificationsMiddleware;
