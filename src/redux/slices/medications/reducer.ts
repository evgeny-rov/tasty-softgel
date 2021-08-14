import {pickBy, without} from 'lodash';
import * as MEDICATIONS_TYPES from './actionTypes';

import subtractMedicationsQuantites from '@utils/subtractMedicationsQuantities';
import {MedicationsActions} from './actions';
import type {MedicationsState} from 'src/types';

type Actions = MedicationsActions;

const initialState: MedicationsState = {
  allIds: [],
  byId: {},
};

const reducer = (state = initialState, action: Actions): MedicationsState => {
  switch (action.type) {
    case MEDICATIONS_TYPES.ADD_MEDICATION: {
      const {id, name, quantity} = action.payload;

      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {
          ...state.byId,
          [id]: {
            id,
            name,
            quantity,
          },
        },
      };
    }
    case MEDICATIONS_TYPES.REMOVE_MEDICATION: {
      const {id: removingId} = action.payload;

      return {
        ...state,
        allIds: without(state.allIds, removingId),
        byId: pickBy(state.byId, ({id}) => id !== removingId),
      };
    }
    case MEDICATIONS_TYPES.UPDATE_MEDICATION: {
      const medication = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [medication.id]: medication,
        },
      };
    }
    case MEDICATIONS_TYPES.CONFIRM_CONSUMPTION_UNPLANNED:
    case MEDICATIONS_TYPES.CONFIRM_CONSUMPTION: {
      const {medications} = action.payload;
      const updatedMedicines = subtractMedicationsQuantites(medications);

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

export default reducer;
