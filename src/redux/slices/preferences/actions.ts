import * as TYPES from './actionTypes';

export type toggleNotificationsStateAction = {
  type: typeof TYPES.NOTIFICATIONS_STATE_CHANGE;
  payload: {nextState: boolean};
};

export const toggleNotificationsState = (
  nextState: boolean,
): toggleNotificationsStateAction => ({
  type: TYPES.NOTIFICATIONS_STATE_CHANGE,
  payload: {nextState},
});
