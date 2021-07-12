import {DailyAssignmentsState} from 'src/types';
import {
  CONFIRM_CONSUMPTION,
  UNPLANNED_CONFIRM_CONSUMPTION,
  DAILY_ASSIGNMENTS_REFRESH,
  DAILY_ASSIGNMENTS_REFRESH_DAY,
  TypedDailyAssignmentsRefresh,
  TypedDailyAssignmentsRefreshDay,
  TypedConfirmConsumption,
} from './daily_assignments.actionTypes';

type TypedAction =
  | TypedConfirmConsumption
  | TypedDailyAssignmentsRefresh
  | TypedDailyAssignmentsRefreshDay;

const initialState: DailyAssignmentsState = {
  currentHour: new Date().getHours(),
  confirmedHours: [],
  lastConfirmationAt: 0,
};

export default (
  state = initialState,
  action: TypedAction,
): DailyAssignmentsState => {
  switch (action.type) {
    case UNPLANNED_CONFIRM_CONSUMPTION: {
      const {timestamp} = action.payload;

      return {
        ...state,
        lastConfirmationAt: timestamp,
      };
    }
    case CONFIRM_CONSUMPTION: {
      const {timestamp, hour} = action.payload;

      return {
        ...state,
        lastConfirmationAt: timestamp,
        confirmedHours: [...state.confirmedHours, hour],
      };
    }
    case DAILY_ASSIGNMENTS_REFRESH: {
      const {hour} = action.payload;

      return {
        ...state,
        currentHour: hour,
      };
    }
    case DAILY_ASSIGNMENTS_REFRESH_DAY: {
      const {hour} = action.payload;
      return {
        ...state,
        currentHour: 0,
        confirmedHours: [],
      };
    }
    default: {
      return state;
    }
  }
};
