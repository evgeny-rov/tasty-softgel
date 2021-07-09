import {Medicine} from 'src/types';
import getMedicinesWithSubtractedCounts from 'src/utils/getMedicinesWithSubtractedCounts';
import isDayPassed from 'src/utils/isDayPassed';
import {
  CONFIRM_CONSUMPTION,
  UNPLANNED_CONFIRM_CONSUMPTION,
  DAILY_ASSIGNMENTS_REFRESH,
  DAILY_ASSIGNMENTS_REFRESH_DAY,
  TypedDailyAssignmentsRefresh,
  TypedDailyAssignmentsRefreshDay,
  TypedConfirmConsumption,
} from './daily_assignments.actionTypes';

export const confirmConsumption = (
  hour: number,
  medicines: Medicine[],
  isUnplanned: boolean = false,
): TypedConfirmConsumption => {
  const timestamp = Date.now();
  const updatedMedicines = getMedicinesWithSubtractedCounts(medicines);
  const payload = {hour, updatedMedicines, timestamp};

  if (isUnplanned) {
    return {
      type: UNPLANNED_CONFIRM_CONSUMPTION,
      payload,
    };
  } else {
    return {
      type: CONFIRM_CONSUMPTION,
      payload,
    };
  }
};

export const dailyAssignmentsRefresh = (
  lastConfirmationAt?: number,
): TypedDailyAssignmentsRefresh | TypedDailyAssignmentsRefreshDay => {
  const currentTime = new Date();
  if (
    lastConfirmationAt &&
    isDayPassed(lastConfirmationAt, currentTime.getTime())
  ) {
    return {
      type: DAILY_ASSIGNMENTS_REFRESH_DAY,
      payload: {},
    };
  } else {
    return {
      type: DAILY_ASSIGNMENTS_REFRESH,
      payload: {
        hour: currentTime.getHours(),
      },
    };
  }
};
