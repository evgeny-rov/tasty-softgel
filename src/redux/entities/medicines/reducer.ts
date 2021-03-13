import {sharedActionTypes, sharedActions} from '../../sharedActions';
import {medicineActionTypes, medicineActions} from './actions';
import {Medicine, MedicinesState} from 'src/types';
import {without} from 'lodash';

type ActionType =
  | medicineActions.AddMedicineActionType
  | sharedActions.assignReminderActionType
  | sharedActions.unassignReminderActionType
  | sharedActions.removeMedicineActionType;

const initialState: MedicinesState = {
  allIds: [],
  byId: {},
};

const medicinesReducer = (
  state = initialState,
  action: ActionType,
): MedicinesState => {
  switch (action.type) {
    case medicineActionTypes.ADD_MEDICINE: {
      const {id, name, amount} = action.payload;
      const newMedicine: Medicine = {
        id,
        name,
        currentAmount: amount,
        initialAmount: amount,
        reminders: [],
      };

      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {...state.byId, [id]: newMedicine},
      };
    }
    case sharedActionTypes.ASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;
      const medicineItem = state.byId[medicineId];
      const newReminders = [...medicineItem.reminders, hour];

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicineId]: {...medicineItem, reminders: newReminders},
        },
      };
    }
    case sharedActionTypes.UNASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;
      const medicineItem = state.byId[medicineId];
      const newReminders = without(medicineItem.reminders, hour);

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicineId]: {...medicineItem, reminders: newReminders},
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default medicinesReducer;
