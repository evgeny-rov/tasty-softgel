import {without} from 'lodash';
import {AppState} from 'src/types';
import {actionTypes} from '../actions';

export type TypedAction =
  | actionTypes.TypedAddMedicineAction
  | actionTypes.TypedUpdateRemindersAction
  | actionTypes.TypedUpdatePickerValueAction;

const initialState: AppState = {
  allIds: [],
  byId: {},
  pickerSelectedValue: 12,
};

const rootReducer = (state = initialState, action: TypedAction): AppState => {
  switch (action.type) {
    case actionTypes.ADD_MEDICINE: {
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
            hours: [],
          },
        },
      };
    }
    case actionTypes.UPDATE_REMINDERS: {
      const {id, hour: pickedHour} = action.payload;
      const isHourAlreadyAssigned = state.byId[id].hours.some(
        (hour) => hour === pickedHour,
      );
      const newHours = isHourAlreadyAssigned
        ? without(state.byId[id].hours, pickedHour)
        : [...state.byId[id].hours, pickedHour];

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            hours: newHours,
          },
        },
      };
    }
    case actionTypes.UPDATE_PICKER_VALUE: {
      const newValue =
        action.payload >= 0 && action.payload <= 23
          ? action.payload
          : state.pickerSelectedValue;

      return {
        ...state,
        pickerSelectedValue: newValue,
      };
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
