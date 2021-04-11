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
  isDataUpdated: false,
  lastConfirmationAt: 0,
};

export default (state = initialState, action: TypedAction): SystemState => {
  switch (action.type) {
    case SYSTEM_STEP: {
      const {nextHour} = action.payload;

      return {
        ...state,
        currentHour: nextHour,
        isDataUpdated: false,
      };
    }
    case CONFIRM_CONSUMPTION: {
      const {timestamp} = action.payload;

      return {
        ...state,
        isDataUpdated: true,
        lastConfirmationAt: timestamp,
      };
    }
    case SYSTEM_REVIVE: {
      const {isStale, hour} = action.payload;

      const shouldDataBeUpdated = !isStale && state.currentHour === hour;
      console.log('revive', shouldDataBeUpdated);

      return {
        ...state,
        currentHour: hour,
        isDataUpdated: shouldDataBeUpdated,
      };
    }
    default: {
      return state;
    }
  }
};
