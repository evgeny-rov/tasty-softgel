import * as MEDICATIONS_TYPES from '../medications/actionTypes';
import * as SCHEDULED_TYPES from './actionTypes';

import type {confirmConsumptionAction, removeMedicationAction} from '../medications/actions';
import type {ScheduledDailyMedicationsActions} from './actions';
import type {ScheduledMedicationsState} from 'src/types';

type Actions = ScheduledDailyMedicationsActions | confirmConsumptionAction | removeMedicationAction;

const initialState: ScheduledMedicationsState = {
  hourIdNow: new Date().getHours(),
  confirmedHourIds: [],
  lastConfirmationAt: 0,
  daily_medications: [],
};

const reducer = (
  state = initialState,
  action: Actions,
): ScheduledMedicationsState => {
  switch (action.type) {
    case SCHEDULED_TYPES.ADD_SCHEDULED_DAILY_MEDICATION: {
      const {medicationId, hourId} = action.payload;

      return {
        ...state,
        daily_medications: [
          ...state.daily_medications,
          {medicationId, hourId},
        ],
      };
    }
    case SCHEDULED_TYPES.REMOVE_SCHEDULED_DAILY_MEDICATION: {
      const {hourId: removingId} = action.payload;

      return {
        ...state,
        daily_medications: state.daily_medications.filter(
          ({hourId}) => hourId !== removingId,
        ),
      };
    }
    case MEDICATIONS_TYPES.REMOVE_MEDICATION: {
      const {id: removingId} = action.payload;

      return {
        ...state,
        daily_medications: state.daily_medications.filter(
          ({medicationId}) => medicationId !== removingId,
        ),
      };
    }
    case MEDICATIONS_TYPES.CONFIRM_CONSUMPTION: {
      const {timestamp, hourId} = action.payload;

      return {
        ...state,
        lastConfirmationAt: timestamp,
        confirmedHourIds: [...state.confirmedHourIds, hourId],
      };
    }
    case SCHEDULED_TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH: {
      const {hourId} = action.payload;

      return {
        ...state,
        hourIdNow: hourId,
      };
    }
    case SCHEDULED_TYPES.SCHEDULED_DAILY_MEDICATIONS_REFRESH_DAY: {
      const {hourId} = action.payload;

      return {
        ...state,
        hourIdNow: hourId,
        confirmedHourIds: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
