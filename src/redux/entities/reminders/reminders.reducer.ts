import {omit, uniq, without} from 'lodash';
import {RemindersState} from 'src/types';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from '../../shared/shared.actions';

type TypedActions = TypedUpdateRemindersAction;

const initlaState: RemindersState = {
  allHours: [],
  byHour: {},
};

export default (state = initlaState, action: TypedActions): RemindersState => {
  switch (action.type) {
    case ASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;

      const reminder = state.byHour[hour] ?? {hour, medicinesIds: []};
      const newReminder = {
        ...reminder,
        medicinesIds: [...reminder.medicinesIds, medicineId],
      };

      return {
        ...state,
        allHours: uniq([...state.allHours, hour]),
        byHour: {
          ...state.byHour,
          [hour]: newReminder,
        },
      };
    }
    case UNASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;

      const reminder = state.byHour[hour];
      const newReminder = {
        ...reminder,
        medicinesIds: without(reminder.medicinesIds, medicineId),
      };
      const newAllHours =
        newReminder.medicinesIds.length < 1
          ? without(state.allHours, hour)
          : [...state.allHours];
      const newByHour =
        newReminder.medicinesIds.length < 1
          ? omit(state.byHour, hour)
          : {...state.byHour};

      return {
        ...state,
        allHours: newAllHours,
        byHour: newByHour,
      };
    }
    default: {
      return state;
    }
  }
};
