import {Medicine, MedicineActionTypes} from '../actions/actions';
import {ADD_MEDICINE, TOGGLE_ASSIGNED_TIME} from '../actions/actionTypes';

export type AppState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
  byTime: {
    [hour: number]: string[];
  };
};

const initialState: AppState = {
  allIds: [],
  byId: {},
  byTime: {},
};

const rootReducer = (
  state = initialState,
  action: MedicineActionTypes,
): AppState => {
  switch (action.type) {
    case ADD_MEDICINE: {
      const {id} = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {...state.byId, [id]: action.payload},
      };
    }
    case TOGGLE_ASSIGNED_TIME: {
      const {id, hour} = action.payload;
      // add later
      return state;
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
