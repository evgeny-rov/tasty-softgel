import getMedicinesWithSubtractedCounts from 'src/utils/getMedicinesWithSubtractedCounts';
import isDayPassed from 'src/utils/isDayPassed';
import {
  CONFIRM_CONSUMPTION,
  UNPLANNED_CONFIRM_CONSUMPTION,
  DAILY_ASSIGNMENTS_REFRESH,
  DAILY_ASSIGNMENTS_REFRESH_DAY,
  TypedDailyAssignmentsRefreshAction,
  TypedConfirmConsumptionAction,
} from './daily_assignments.actionTypes';
import {Medicine} from 'src/types';

export const confirmConsumption = (
  hour: number,
  medicines: Medicine[],
  isUnplanned: boolean = false,
): TypedConfirmConsumptionAction => {
  const timestamp = Date.now();
  const updatedMedicines = getMedicinesWithSubtractedCounts(medicines);
  const payload = {
    hour,
    assignedMedicines: medicines,
    updatedMedicines,
    timestamp,
  };

  return {
    type: isUnplanned ? UNPLANNED_CONFIRM_CONSUMPTION : CONFIRM_CONSUMPTION,
    payload,
  };
};

export const dailyAssignmentsRefresh = (
  lastConfirmationAt?: number,
): TypedDailyAssignmentsRefreshAction => {
  const currentTime = new Date();

  const shouldUseRefreshDayAction =
    lastConfirmationAt &&
    isDayPassed(lastConfirmationAt, currentTime.getTime());

  return {
    type: shouldUseRefreshDayAction
      ? DAILY_ASSIGNMENTS_REFRESH_DAY
      : DAILY_ASSIGNMENTS_REFRESH,
    payload: {
      hour: currentTime.getHours(),
    },
  };
};
