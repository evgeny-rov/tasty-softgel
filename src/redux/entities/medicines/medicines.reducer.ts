import {MedicinesState} from 'src/types';
import {
  TypedAddMedicineAction,
  TypedRemoveMedicineAction,
  REMOVE_MEDICINE,
  ADD_MEDICINE,
} from './medicines.actionTypes';
import {
  ASSIGN_MEDICINE,
  UNASSIGN_MEDICINE,
  TypedUpdateAssignmentsAction,
} from '../assignments/assignments.actionTypes';
import {
  CONFIRM_CONSUMPTION,
  TypedConfirmConsumptionAction,
} from '../consumptions/consumptions.actionTypes';

import {omit, without} from 'lodash';

type TypedAction =
  | TypedAddMedicineAction
  | TypedUpdateAssignmentsAction
  | TypedConfirmConsumptionAction
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
            assignments: [],
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
    case ASSIGN_MEDICINE: {
      const {medicineId, hour} = action.payload;

      const medicineItem = state.byId[medicineId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicineId]: {
            ...medicineItem,
            assignments: [...medicineItem.assignments, hour],
          },
        },
      };
    }
    case UNASSIGN_MEDICINE: {
      const {medicineId, hour} = action.payload;

      const medicineItem = state.byId[medicineId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicineId]: {
            ...medicineItem,
            assignments: without(medicineItem.assignments, hour),
          },
        },
      };
    }
    case CONFIRM_CONSUMPTION: {
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
