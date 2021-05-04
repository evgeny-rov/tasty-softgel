import {Middleware} from 'redux';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from 'src/redux/entities/reminders/reminders.actionTypes';
import {
  CONFIRM_CONSUMPTION,
  TypedConfirmConsumptionAction,
} from 'src/redux/entities/system/system.actionTypes';
import {AppStateType} from 'src/types';

import {
  handleAssignReminder,
  handleUnassignReminder,
  handleNextScheduledReminder,
} from './notifications.manager';

type ExpectedAction =
  | TypedUpdateRemindersAction
  | TypedConfirmConsumptionAction;

const triggerActions = [
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  CONFIRM_CONSUMPTION,
];

type params = {
  hour: number;
  prevState: AppStateType;
  nextState: AppStateType;
};

const triggerResponses = {
  ASSIGN_REMINDER: (params: params) =>
    handleAssignReminder(params.hour, params.nextState),
  UNASSIGN_REMINDER: (params: params) =>
    handleUnassignReminder(params.hour, params.nextState),
  CONFIRM_CONSUMPTION: (params: params) =>
    handleNextScheduledReminder(params.hour, params.nextState),
};

const testMiddleware: Middleware = ({getState}) => (next) => (
  action: ExpectedAction,
) => {
  const prevState: AppStateType = getState();
  const result = next(action);

  if (triggerActions.includes(action.type)) {
    const nextState: AppStateType = getState();
    triggerResponses[action.type]({
      hour: action.payload.hour,
      prevState,
      nextState,
    });
  }

  return result;
};

export default testMiddleware;
