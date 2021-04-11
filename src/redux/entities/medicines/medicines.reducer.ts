import {MedicinesState} from 'src/types';
import {
  TypedAddMedicineAction,
  TypedRemoveMedicineAction,
  TypedUpdateMedicinesAmounts,
  REMOVE_MEDICINE,
  ADD_MEDICINE,
  UPDATE_MEDICINES_AMOUNTS,
} from './medicines.actionTypes';
import {
  ASSIGN_REMINDER,
  UNASSIGN_REMINDER,
  TypedUpdateRemindersAction,
} from '../reminders/reminders.actionTypes';
import {omit, without} from 'lodash';

type TypedAction =
  | TypedAddMedicineAction
  | TypedUpdateRemindersAction
  | TypedUpdateMedicinesAmounts
  | TypedRemoveMedicineAction;

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
    case REMOVE_MEDICINE: {
      const {id} = action.payload;

      return {
        ...state,
        allIds: without(state.allIds, id),
        byId: omit(state.byId, id),
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
    case UPDATE_MEDICINES_AMOUNTS: {
      const {medicinesIds} = action.payload;
      const updatedMedicines = {...state.byId};

      medicinesIds.forEach((id) => {
        const {currentAmount} = updatedMedicines[id];
        if (currentAmount < 1) return;

        updatedMedicines[id].currentAmount -= 1;
      });

      return {
        ...state,
        byId: updatedMedicines,
      };
    }
    default: {
      return state;
    }
  }
};
