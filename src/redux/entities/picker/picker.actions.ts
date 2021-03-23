export const UPDATE_PICKER_VALUE = 'UPDATE_PICKER_VALUE';

export type TypedUpdatePickerValueAction = {
  type: typeof UPDATE_PICKER_VALUE;
  payload: number;
};

export const updatePickerValue = ({
  value,
}: {
  value: number;
}): TypedUpdatePickerValueAction => ({
  type: UPDATE_PICKER_VALUE,
  payload: value,
});
