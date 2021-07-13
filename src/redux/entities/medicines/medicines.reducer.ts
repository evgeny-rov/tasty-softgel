import {pickBy, without} from 'lodash';
import {Medicine, MedicinesState} from 'src/types';
import {
  TypedAddMedicineAction,
  TypedRemoveMedicineAction,
  TypedUpdateMedicineAction,
  REMOVE_MEDICINE,
  ADD_MEDICINE,
  UPDATE_MEDICINE,
} from './medicines.actionTypes';
import {
  CONFIRM_CONSUMPTION,
  UNPLANNED_CONFIRM_CONSUMPTION,
  TypedConfirmConsumptionAction,
} from '../daily_assignments/daily_assignments.actionTypes';

type TypedAction =
  | TypedAddMedicineAction
  | TypedUpdateMedicineAction
  | TypedConfirmConsumptionAction
  | TypedRemoveMedicineAction;

const initialState: MedicinesState = {
  allIds: [],
  byId: {},
};

export default (state = initialState, action: TypedAction): MedicinesState => {
  switch (action.type) {
    case ADD_MEDICINE: {
      const {id, name, count} = action.payload;

      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {
          ...state.byId,
          [id]: {
            id,
            name,
            count,
          },
        },
      };
    }
    case REMOVE_MEDICINE: {
      const {id} = action.payload;

      return {
        ...state,
        allIds: without(state.allIds, id),
        byId: pickBy(state.byId, (medicine) => medicine.id !== id),
      };
    }
    case UPDATE_MEDICINE: {
      const medicine = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [medicine.id]: medicine,
        },
      };
    }
    case CONFIRM_CONSUMPTION:
    case UNPLANNED_CONFIRM_CONSUMPTION: {
      const {updatedMedicines} = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          ...updatedMedicines,
        },
      };
    }
    default: {
      return state;
    }
  }
};
