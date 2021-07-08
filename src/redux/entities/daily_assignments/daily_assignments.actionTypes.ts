import {Medicine} from 'src/types';

export const UPDATE_HOUR = 'UPDATE_HOUR';
export const CONFIRM_CONSUMPTION = 'CONFIRM_CONSUMPTION';
export const DAILY_ASSIGNMENTS_REFRESH = 'DAILY_ASSIGNMENTS_REFRESH';

export type TypedUpdateHourAction = {
  type: typeof UPDATE_HOUR;
  payload: {nextHour: number};
};

export type TypedConfirmConsumptionAction = {
  type: typeof CONFIRM_CONSUMPTION;
  payload: {timestamp: number; hour: number; medicines: Medicine[]};
};

export type TypedDailyAssignmentsRefresh = {
  type: typeof DAILY_ASSIGNMENTS_REFRESH;
  payload: {isDayPassed: boolean; hour: number};
};
