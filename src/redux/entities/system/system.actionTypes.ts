export const SYSTEM_STEP = 'SYSTEM_STEP';
export const CONFIRM_CONSUMPTION = 'CONFIRM_CONSUMPTION';
export const SYSTEM_REVIVE = 'SYSTEM_REVIVE';

export type TypedSystemStepAction = {
  type: typeof SYSTEM_STEP;
  payload: {nextHour: number};
};

export type TypedConfirmConsumptionAction = {
  type: typeof CONFIRM_CONSUMPTION;
  payload: {timestamp: number};
};

export type TypedSystemReviveAction = {
  type: typeof SYSTEM_REVIVE;
  payload: {isStale: boolean, hour: number};
};
