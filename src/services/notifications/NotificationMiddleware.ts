import {Middleware} from 'redux';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from 'src/redux/shared/shared.actions';
import {AppState} from 'src/types';
import {
  getScheduledNotifications,
  updateNotifications,
} from './NotificationManager';

type ExpectedAction = TypedUpdateRemindersAction;

const triggerActions = [ASSIGN_REMINDER, UNASSIGN_REMINDER];

const testMiddleware: Middleware = ({getState}) => (next) => (
  action: ExpectedAction,
) => {
  const result = next(action);

  if (triggerActions.includes(action.type)) {
    const nextState: AppState = getState();
    getScheduledNotifications(console.log);
    updateNotifications(nextState.reminders.allHours);
    getScheduledNotifications(console.log);
  }

  return result;
};

export default testMiddleware;
