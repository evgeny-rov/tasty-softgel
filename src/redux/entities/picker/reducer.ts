import {PickerState} from 'src/types';
import {pickerActionTypes, pickerActions} from './actions';

const initialState: PickerState = {
  value: 12,
};

type ActionType = pickerActions.UpdatePickerValueActionType;

const pickerReducer = (
  state = initialState,
  action: ActionType,
): PickerState => {
  switch (action.type) {
    case pickerActionTypes.UPDATE_PICKER_VALUE: {
      return {
        ...state,
        value:
          action.payload > 0 && action.payload < 23
            ? action.payload
            : state.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default pickerReducer;
