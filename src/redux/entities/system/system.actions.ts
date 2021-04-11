import {
  SYSTEM_STEP,
  CONFIRM_CONSUMPTION,
  SYSTEM_REVIVE,
  TypedSystemReviveAction,
  TypedSystemStepAction,
  TypedConfirmConsumptionAction,
} from './system.actionTypes';

const checkIfStale = (timestamp1: number, timestamp2: number) => {
  const oneHourInMs = 1000 * 60 * 60;

  return Math.abs(timestamp1 - timestamp2) > oneHourInMs;
};

export const systemStep = (): TypedSystemStepAction => ({
  type: SYSTEM_STEP,
  payload: {nextHour: new Date().getHours()},
});

export const confirmConsumption = (): TypedConfirmConsumptionAction => ({
  type: CONFIRM_CONSUMPTION,
  payload: {timestamp: Date.now()},
});

export const systemRevive = ({
  lastConfirmationAt,
}: {
  lastConfirmationAt: number;
}): TypedSystemReviveAction => ({
  type: SYSTEM_REVIVE,
  payload: {
    isStale: checkIfStale(Date.now(), lastConfirmationAt),
    hour: new Date().getHours(),
  },
});
