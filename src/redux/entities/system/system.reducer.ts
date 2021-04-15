import {SystemState} from 'src/types';
import {
  SYSTEM_STEP,
  CONFIRM_CONSUMPTION,
  SYSTEM_REVIVE,
  TypedSystemReviveAction,
  TypedConfirmConsumptionAction,
  TypedSystemStepAction,
} from './system.actionTypes';

type TypedAction =
  | TypedSystemStepAction
  | TypedConfirmConsumptionAction
  | TypedSystemReviveAction;

const initialState: SystemState = {
  currentHour: new Date().getHours(),
  consumptionConfirmedHours: [],
  lastConsumptionConfirmationAt: 0,
};

export default (state = initialState, action: TypedAction): SystemState => {
  switch (action.type) {
    case SYSTEM_STEP: {
      const {nextHour} = action.payload;

      return {
        ...state,
        currentHour: nextHour,
        consumptionConfirmedHours:
          nextHour === 0 ? [] : state.consumptionConfirmedHours,
      };
    }
    case CONFIRM_CONSUMPTION: {
      const {timestamp, hour} = action.payload;

      return {
        ...state,
        lastConsumptionConfirmationAt: timestamp,
        consumptionConfirmedHours: [...state.consumptionConfirmedHours, hour],
      };
    }
    case SYSTEM_REVIVE: {
      const {isDayPassed, hour} = action.payload;

      return {
        ...state,
        currentHour: hour,
        consumptionConfirmedHours: isDayPassed
          ? []
          : state.consumptionConfirmedHours,
      };
    }
    default: {
      return state;
    }
  }
};
