import {AppStateType} from 'src/types';

export const getCurrentHour = (state: AppStateType) =>
  state.daily_assignments.currentHour;
