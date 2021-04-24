import isDayPassed from 'src/utils/isDayPassed';
import {
  UPDATE_HOUR,
  CONFIRM_CONSUMPTION,
  CONSUMPTIONS_RENEW,
  TypedConsumptionsRenewAction,
  TypedUpdateHourAction,
  TypedConfirmConsumptionAction,
} from './consumptions.actionTypes';

export const updateHour = (): TypedUpdateHourAction => ({
  type: UPDATE_HOUR,
  payload: {nextHour: new Date().getHours()},
});

export const confirmConsumption = (
  hour: number,
  medicinesIds: string[],
): TypedConfirmConsumptionAction => ({
  type: CONFIRM_CONSUMPTION,
  payload: {timestamp: Date.now(), hour, medicinesIds},
});

export const consumptionsRenew = ({
  lastConfirmationAt,
}: {
  lastConfirmationAt: number;
}): TypedConsumptionsRenewAction => ({
  type: CONSUMPTIONS_RENEW,
  payload: {
    isDayPassed: isDayPassed(lastConfirmationAt),
    hour: new Date().getHours(),
  },
});
