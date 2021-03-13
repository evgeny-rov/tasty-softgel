import {sharedActionTypes, sharedActions} from '../../sharedActions';
import {Reminder, RemindersState} from 'src/types';
import {union, get, without} from 'lodash';

type ActionType =
  | sharedActions.assignReminderActionType
  | sharedActions.unassignReminderActionType
  | sharedActions.removeMedicineActionType;

const initialState: RemindersState = {
  allHours: [],
  byHour: {},
};

const remindersReducer = (
  state = initialState,
  action: ActionType,
): RemindersState => {
  switch (action.type) {
    case sharedActionTypes.ASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;
      const newHourItem: Reminder = get(state.byHour, hour, {
        hour,
        medicines: [],
      });

      newHourItem.medicines = [...newHourItem.medicines, medicineId];
      const newAllHours = union(state.allHours, [hour]);

      return {
        ...state,
        allHours: newAllHours,
        byHour: {
          ...state.byHour,
          [hour]: newHourItem,
        },
      };
    }
    case sharedActionTypes.UNASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;
      const currentHourItem: Reminder = get(state.byHour, hour);
      const newHourItem: Reminder = {
        ...currentHourItem,
        medicines: without(currentHourItem.medicines, medicineId),
      };
      const newAllHours =
        newHourItem.medicines.length > 0
          ? [...state.allHours]
          : without(state.allHours, hour);

      return {
        ...state,
        allHours: newAllHours,
        byHour: {
          ...state.byHour,
          [hour]: newHourItem,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default remindersReducer;
