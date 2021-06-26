import {AppStateType} from 'src/types';

export const getCurrentHour = (state: AppStateType) =>
  state.consumptions.currentHour;
