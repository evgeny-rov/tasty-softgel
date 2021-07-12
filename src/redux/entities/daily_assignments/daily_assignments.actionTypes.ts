import {Medicine} from 'src/types';

export const CONFIRM_CONSUMPTION = 'CONFIRM_CONSUMPTION';
export const UNPLANNED_CONFIRM_CONSUMPTION = 'UNPLANNED_CONFIRM_CONSUMPTION';
export const DAILY_ASSIGNMENTS_REFRESH = 'DAILY_ASSIGNMENTS_REFRESH';
export const DAILY_ASSIGNMENTS_REFRESH_DAY = 'DAILY_ASSIGNMENTS_REFRESH_DAY';

export type TypedConfirmConsumption = {
  type: typeof CONFIRM_CONSUMPTION | typeof UNPLANNED_CONFIRM_CONSUMPTION;
  payload: {
    timestamp: number;
    hour: number;
    updatedMedicines: {[id: string]: Medicine};
  };
};

export type TypedDailyAssignmentsRefresh = {
  type: typeof DAILY_ASSIGNMENTS_REFRESH;
  payload: {hour: number};
};

export type TypedDailyAssignmentsRefreshDay = {
  type: typeof DAILY_ASSIGNMENTS_REFRESH_DAY;
  payload: {hour: number};
};
