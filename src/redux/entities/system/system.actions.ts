import isDayPassed from 'src/utils/isDayPassed';
import {
  SYSTEM_STEP,
  CONFIRM_CONSUMPTION,
  SYSTEM_REVIVE,
  TypedSystemReviveAction,
  TypedSystemStepAction,
  TypedConfirmConsumptionAction,
} from './system.actionTypes';

export const systemStep = (): TypedSystemStepAction => ({
  type: SYSTEM_STEP,
  payload: {nextHour: new Date().getHours()},
});

export const confirmConsumption = (
  hour: number,
): TypedConfirmConsumptionAction => ({
  type: CONFIRM_CONSUMPTION,
  payload: {timestamp: Date.now(), hour},
});

export const systemRevive = ({
  lastConsumptionConfirmationAt,
}: {
  lastConsumptionConfirmationAt: number;
}): TypedSystemReviveAction => ({
  type: SYSTEM_REVIVE,
  payload: {
    isDayPassed: isDayPassed(lastConsumptionConfirmationAt),
    hour: new Date().getHours(),
  },
});
