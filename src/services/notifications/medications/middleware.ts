import {Middleware} from 'redux';
import * as MEDICATIONS_TYPES from 'src/redux/slices/medications/actionTypes';
import * as SCHEDULED_TYPES from 'src/redux/slices/scheduled_medications/actionTypes';
import {AppDispatch, RootState} from 'src/redux/store';
import {handleConfirmationAction, handleMedicationsUpdates} from './handlers';

const expectedStateChangeActionTypes = [];
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

  if (expectedHandlersActionTypes.includes(action.type))
    useHandler(action, getState());

  return result;
};

export default medicationsNotificationsMiddleware;
