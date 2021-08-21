import {InteractionManager} from 'react-native';
import {Middleware} from 'redux';
import * as MEDICATIONS_TYPES from 'src/redux/slices/medications/actionTypes';
import * as SCHEDULED_TYPES from 'src/redux/slices/scheduled_medications/actionTypes';
import * as PREFERENCES_TYPES from 'src/redux/slices/preferences/actionTypes';
import {
  handleConfirmationAction,
  handleMedicationsUpdates,
  handleStateChange,
} from './handlers';

import type {AppDispatch, RootState} from 'src/redux/store';

const expectedStateChangeActionTypes = [
  PREFERENCES_TYPES.NOTIFICATIONS_STATE_CHANGE,
];
const expectedHandlersActionTypes = [
  MEDICATIONS_TYPES.UPDATE_MEDICATION,
  MEDICATIONS_TYPES.REMOVE_MEDICATION,
  MEDICATIONS_TYPES.CONFIRM_CONSUMPTION,
  MEDICATIONS_TYPES.CONFIRM_CONSUMPTION_UNPLANNED,
  SCHEDULED_TYPES.ADD_SCHEDULED_DAILY_MEDICATION,
  SCHEDULED_TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION,
];

const useHandler = (action: ReturnType<AppDispatch>, state: RootState) => {
  switch (action.type) {
    case MEDICATIONS_TYPES.UPDATE_MEDICATION:
    case MEDICATIONS_TYPES.REMOVE_MEDICATION:
    case SCHEDULED_TYPES.ADD_SCHEDULED_DAILY_MEDICATION:
    case SCHEDULED_TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION: {
      handleMedicationsUpdates(state);
      break;
    }
    case MEDICATIONS_TYPES.CONFIRM_CONSUMPTION:
    case MEDICATIONS_TYPES.CONFIRM_CONSUMPTION_UNPLANNED: {
      handleConfirmationAction(action.payload, state);
      break;
    }
    default: {
      return null;
    }
  }
};

const medicationsNotificationsMiddleware: Middleware = ({
  getState,
}: {
  getState: () => RootState;
}) => (next) => (action: ReturnType<AppDispatch>) => {
  const result = next(action);

  const isNotificationsActive = getState().preferences.isNotificationsActive;

  if (expectedStateChangeActionTypes.includes(action.type)) {
    InteractionManager.runAfterInteractions(() => {
      handleStateChange(isNotificationsActive, getState());
    });
  }

  if (
    isNotificationsActive &&
    expectedHandlersActionTypes.includes(action.type)
  ) {
    InteractionManager.runAfterInteractions(() => {
      useHandler(action, getState());
    });
  }

  return result;
};

export default medicationsNotificationsMiddleware;
