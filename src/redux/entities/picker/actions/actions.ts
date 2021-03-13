import {UPDATE_PICKER_VALUE} from './actionTypes';

export type UpdatePickerValueActionType = {
  type: typeof UPDATE_PICKER_VALUE;
  payload: number;
};

export const updatePickerValue = (
  value: number,
): UpdatePickerValueActionType => ({
  type: UPDATE_PICKER_VALUE,
  payload: value,
});
