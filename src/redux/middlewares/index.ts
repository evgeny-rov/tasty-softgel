import persistorRehydrationMiddleware from './persistorRehydrationMiddleware';
import medicinesNotificationsMiddleware from './medicinesNotificationsMiddleware';
import thunk from 'redux-thunk';

export const middlewares = [
  persistorRehydrationMiddleware,
  // medicinesNotificationsMiddleware,
  thunk,
];
