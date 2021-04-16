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
  setNextNotification,
  setNotification,
  unsetNotification,
} from './NotificationManager';

type ExpectedAction =
  | TypedUpdateRemindersAction
  | TypedConfirmConsumptionAction;

const triggerActions = [
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  CONFIRM_CONSUMPTION,
];

const triggerResponses = {
  ASSIGN_REMINDER: setNotification,
  UNASSIGN_REMINDER: unsetNotification,
  CONFIRM_CONSUMPTION: setNextNotification,
};

const testMiddleware: Middleware = ({getState}) => (next) => (
  action: ExpectedAction,
) => {
  const prevState: AppStateType = getState();
  const result = next(action);

  if (triggerActions.includes(action.type)) {
    const nextState: AppStateType = getState();
    triggerResponses[action.type](action.payload.hour, prevState, nextState);
  }

  return result;
};

export default testMiddleware;
