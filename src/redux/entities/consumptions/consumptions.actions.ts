import {Medicine} from 'src/types';
import isDayPassed from 'src/utils/isDayPassed';
import {
  UPDATE_HOUR,
  CONFIRM_CONSUMPTION,
  CONSUMPTIONS_REFRESH,
  TypedConsumptionsRefreshAction,
  TypedUpdateHourAction,
  TypedConfirmConsumptionAction,
} from './consumptions.actionTypes';

export const updateHour = (): TypedUpdateHourAction => ({
  type: UPDATE_HOUR,
  payload: {nextHour: new Date().getHours()},
});

export const confirmConsumption = (
  hour: number,
  medicines: Medicine[],
): TypedConfirmConsumptionAction => ({
  type: CONFIRM_CONSUMPTION,
  payload: {timestamp: Date.now(), hour, medicines},
});

export const consumptionsRefresh = ({
  lastConfirmationAt,
}: {
  lastConfirmationAt: number;
}): TypedConsumptionsRefreshAction => ({
  type: CONSUMPTIONS_REFRESH,
  payload: {
    isDayPassed: isDayPassed(lastConfirmationAt),
    hour: new Date().getHours(),
  },
});
