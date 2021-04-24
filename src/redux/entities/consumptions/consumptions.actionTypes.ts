export const UPDATE_HOUR = 'UPDATE_HOUR';
export const CONFIRM_CONSUMPTION = 'CONFIRM_CONSUMPTION';
export const CONSUMPTIONS_RENEW = 'CONSUMPTIONS_RENEW';

export type TypedUpdateHourAction = {
  type: typeof UPDATE_HOUR;
  payload: {nextHour: number};
};

export type TypedConfirmConsumptionAction = {
  type: typeof CONFIRM_CONSUMPTION;
  payload: {timestamp: number; hour: number; medicinesIds: string[]};
};

export type TypedConsumptionsRenewAction = {
  type: typeof CONSUMPTIONS_RENEW;
  payload: {isDayPassed: boolean; hour: number};
};
