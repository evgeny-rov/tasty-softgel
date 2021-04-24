import {ConsumptionsState} from 'src/types';
import {
  UPDATE_HOUR,
  CONFIRM_CONSUMPTION,
  CONSUMPTIONS_RENEW,
  TypedConsumptionsRenewAction,
  TypedConfirmConsumptionAction,
  TypedUpdateHourAction,
} from './consumptions.actionTypes';

type TypedAction =
  | TypedUpdateHourAction
  | TypedConfirmConsumptionAction
  | TypedConsumptionsRenewAction;

const initialState: ConsumptionsState = {
  currentHour: new Date().getHours(),
  confirmedHours: [],
  lastConfirmationAt: 0,
};

export default (state = initialState, action: TypedAction): ConsumptionsState => {
  switch (action.type) {
    case UPDATE_HOUR: {
      const {nextHour} = action.payload;

      return {
        ...state,
        currentHour: nextHour,
        confirmedHours:
          nextHour === 0 ? [] : state.confirmedHours,
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
    case CONSUMPTIONS_RENEW: {
      const {isDayPassed, hour} = action.payload;

      return {
        ...state,
        currentHour: hour,
        confirmedHours: isDayPassed
          ? []
          : state.confirmedHours,
      };
    }
    default: {
      return state;
    }
  }
};
