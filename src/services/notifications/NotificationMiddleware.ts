import {Middleware} from 'redux';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from 'src/redux/shared/shared.actions';
import {AppStateType} from 'src/types';
import {updateDailyNotifications} from './NotificationManager';

type ExpectedAction = TypedUpdateRemindersAction;

const triggerActions = [ASSIGN_REMINDER, UNASSIGN_REMINDER];

const testMiddleware: Middleware = ({getState}) => (next) => (
  action: ExpectedAction,
) => {
  const result = next(action);

  if (triggerActions.includes(action.type)) {
    const nextState: AppStateType = getState();
    updateDailyNotifications(nextState.reminders.allHours);
  }

  return result;
};

export default testMiddleware;
