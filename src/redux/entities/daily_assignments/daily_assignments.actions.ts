import {Medicine} from 'src/types';
import isDayPassed from 'src/utils/isDayPassed';
import {
  UPDATE_HOUR,
  CONFIRM_CONSUMPTION,
  DAILY_ASSIGNMENTS_REFRESH,
  TypedDailyAssignmentsRefresh,
  TypedUpdateHourAction,
  TypedConfirmConsumptionAction,
} from './daily_assignments.actionTypes';

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

export const dailyAssignmentsRefresh = ({
  lastConfirmationAt,
}: {
  lastConfirmationAt: number;
}): TypedDailyAssignmentsRefresh => {
  const currentTime = new Date();
  return {
    type: DAILY_ASSIGNMENTS_REFRESH,
    payload: {
      isDayPassed: isDayPassed(lastConfirmationAt, currentTime.getTime()),
      hour: currentTime.getHours(),
    },
  };
};
