import {Middleware} from 'redux';
import {
  ADD_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from 'src/redux/entities/assignments/assignments.actionTypes';

import {
  handleConfirmationAction,
  handleCreateReminder,
  handleRemoveReminder,
} from './notifications.manager';

import {
  CONFIRM_CONSUMPTION,
  TypedConfirmConsumptionAction,
} from 'src/redux/entities/consumptions/consumptions.actionTypes';
import {AppStateType} from 'src/types';

type ExpectedAction =
  | TypedAddAssignmentAction
  | TypedRemoveAssignmentAction
  | TypedConfirmConsumptionAction;

const triggerActions = [ADD_ASSIGNMENT, REMOVE_ASSIGNMENT, CONFIRM_CONSUMPTION];

type params = {
  hour: number;
  state: AppStateType;
};

const triggerResponses = {
  ADD_ASSIGNMENT: (params: params) => handleCreateReminder(params.hour),
  REMOVE_ASSIGNMENT: (params: params) =>
    handleRemoveReminder(params.hour, params.state),
  CONFIRM_CONSUMPTION: (params: params) =>
    handleConfirmationAction(params.hour, params.state),
};

const testMiddleware: Middleware = ({getState}) => (next) => (
  action: ExpectedAction,
) => {
  const result = next(action);

  if (triggerActions.includes(action.type)) {
    const nextState: AppStateType = getState();
    triggerResponses[action.type]({
      hour: action.payload.hour,
      state: nextState,
    });
  }

  return result;
};

export default testMiddleware;
