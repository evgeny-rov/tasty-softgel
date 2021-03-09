import {AppState} from 'src/types';
import {MedicineActionTypes} from '../actions/actions';
import {
  ADD_MEDICINE,
  ASSIGN_TIME,
  UNASSIGN_TIME,
  UPDATE_SELECTED_HOUR,
} from '../actions/actionTypes';

const initialState: AppState = {
  allIds: [],
  byId: {},
  selectedRemindersHour: 12,
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
    case ASSIGN_TIME: {
      const {id, hour} = action.payload;
      const updatedHours = [...state.byId[id].intakeHours, hour];

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {...state.byId[id], intakeHours: updatedHours},
        },
      };
    }
    case UNASSIGN_TIME: {
      const {id, hour} = action.payload;
      const updatedHours = state.byId[id].intakeHours.filter(
        (el) => el !== hour,
      );

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {...state.byId[id], intakeHours: updatedHours},
        },
      };
    }
    case UPDATE_SELECTED_HOUR: {
      return {
        ...state,
        selectedRemindersHour: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
