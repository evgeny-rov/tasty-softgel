import persistorRehydrationMiddleware from './persistorRehydrationMiddleware';
import medicinesNotificationsMiddleware from './medicinesNotificationsMiddleware';

export const middlewares = [
  persistorRehydrationMiddleware,
  medicinesNotificationsMiddleware,
];
