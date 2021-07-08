import {DailyAssignmentsState} from 'src/types';
import {
  UPDATE_HOUR,
  CONFIRM_CONSUMPTION,
  DAILY_ASSIGNMENTS_REFRESH,
  TypedDailyAssignmentsRefresh,
  TypedConfirmConsumptionAction,
  TypedUpdateHourAction,
} from './daily_assignments.actionTypes';

type TypedAction =
  | TypedUpdateHourAction
  | TypedConfirmConsumptionAction
  | TypedDailyAssignmentsRefresh;

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
    case UPDATE_HOUR: {
      const {nextHour} = action.payload;

      return {
        ...state,
        currentHour: nextHour,
        confirmedHours: nextHour === 0 ? [] : [...state.confirmedHours],
      };
    }
    case CONFIRM_CONSUMPTION: {
      const {timestamp, hour} = action.payload;

      const isConfirmationFromPreviousDay = hour > state.currentHour;

      return {
        ...state,
        lastConfirmationAt: timestamp,
        confirmedHours: isConfirmationFromPreviousDay
          ? [...state.confirmedHours]
          : [...state.confirmedHours, hour],
      };
    }
    case DAILY_ASSIGNMENTS_REFRESH: {
      const {isDayPassed, hour} = action.payload;

      return {
        ...state,
        currentHour: hour,
        confirmedHours: isDayPassed ? [] : [...state.confirmedHours],
      };
    }
    default: {
      return state;
    }
  }
};
