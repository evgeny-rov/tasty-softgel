import {Middleware, Dispatch} from 'redux';
import {REHYDRATE} from 'redux-persist';
import {AppStateType} from 'src/types';
import {dailyAssignmentsRefresh} from '../entities/daily_assignments/daily_assignments.actions';

const persistorRehydrationMiddleware: Middleware<Dispatch, AppStateType> = (store) => (next) => (
  action,
) => {
  const result = next(action);

  if (action.type === REHYDRATE) {
    const {lastConfirmationAt} = store.getState().daily_assignments;
    store.dispatch(dailyAssignmentsRefresh(lastConfirmationAt));
  }

  return result;
};

export default persistorRehydrationMiddleware;
