import {RemindersState} from 'src/types';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from './reminders.actionTypes';
import {
  REMOVE_MEDICINE,
  TypedRemoveMedicineAction,
} from '../medicines/medicines.actionTypes';
import {omit, uniq, without} from 'lodash';

type TypedActions = TypedUpdateRemindersAction | TypedRemoveMedicineAction;

const initlaState: RemindersState = {
  allHours: [],
  byHour: {},
};

const getNewStateWithoutReminder = (
  state: RemindersState,
  hour: number,
  medicineId: string,
): RemindersState => {
  const reminder = state.byHour[hour];
  const updatedReminder = {
    ...reminder,
    medicinesIds: without(reminder.medicinesIds, medicineId),
  };

  const newAllHours =
    updatedReminder.medicinesIds.length < 1
      ? without(state.allHours, hour)
      : [...state.allHours];
  const newByHourItems =
    updatedReminder.medicinesIds.length < 1
      ? omit(state.byHour, hour)
      : {...state.byHour, [hour]: updatedReminder};

  return {allHours: newAllHours, byHour: newByHourItems};
};

export default (state = initlaState, action: TypedActions): RemindersState => {
  switch (action.type) {
    case REMOVE_MEDICINE: {
      const medicine = action.payload;
      const newState = {...state};

      medicine.reminders.forEach((hour) => {
        const updatedState = getNewStateWithoutReminder(
          newState,
          hour,
          medicine.id,
        );
        newState.allHours = updatedState.allHours;
        newState.byHour = updatedState.byHour;
      });

      return {
        ...state,
        allHours: newState.allHours,
        byHour: newState.byHour,
      };
    }
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

      const newState = getNewStateWithoutReminder(state, hour, medicineId);

      return {
        ...state,
        allHours: newState.allHours,
        byHour: newState.byHour,
      };
    }
    default: {
      return state;
    }
  }
};
