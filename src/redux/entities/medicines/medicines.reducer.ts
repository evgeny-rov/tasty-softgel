import {MedicinesState} from 'src/types';
import {TypedAddMedicineAction, ADD_MEDICINE} from './medicines.actions';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from '../../shared/shared.actions';
import {without} from 'lodash';

type TypedAction = TypedAddMedicineAction | TypedUpdateRemindersAction;

const initialState: MedicinesState = {
  allIds: [],
  byId: {},
};

export default (state = initialState, action: TypedAction): MedicinesState => {
  switch (action.type) {
    case ADD_MEDICINE: {
      const {id, name, amount} = action.payload;

      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {
          ...state.byId,
          [id]: {
            id,
            name,
            currentAmount: amount,
            initialAmount: amount,
            reminders: [],
          },
        },
      };
    }
    case ASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;

      const medicineItem = state.byId[medicineId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicineId]: {
            ...medicineItem,
            reminders: [...medicineItem.reminders, hour],
          },
        },
      };
    }
    case UNASSIGN_REMINDER: {
      const {medicineId, hour} = action.payload;

      const medicineItem = state.byId[medicineId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicineId]: {
            ...medicineItem,
            reminders: without(medicineItem.reminders, hour),
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
