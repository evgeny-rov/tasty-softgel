import {
  TypedUpdatePickerValueAction,
  UPDATE_PICKER_VALUE,
} from './picker.actions';

type TypedAction = TypedUpdatePickerValueAction;

const initialState: number = 12;

export default (state = initialState, action: TypedAction): number => {
  switch (action.type) {
    case UPDATE_PICKER_VALUE: {
      const newValue =
        action.payload >= 0 && action.payload <= 23 ? action.payload : state;

      return newValue;
    }
    default: {
      return state;
    }
  }
};
