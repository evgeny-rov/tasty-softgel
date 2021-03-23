import {createSelector} from 'reselect';
import {AppState} from 'src/types';

const getMedicinesIds = (state: AppState) => state.medicines.allIds;
const getMedicines = (state: AppState) => state.medicines.byId;
const getAllHours = (state: AppState) => state.reminders.allHours;
const getByHoursReminders = (state: AppState) => state.reminders.byHour;

export const byHourMedicinesSelector = createSelector(
  [getMedicines, getAllHours, getByHoursReminders],
  (medicines, hours, byHourReminders) => {
    return hours
      .sort((a, b) => a - b)
      .map((hour) => {
        const mappedMedicines = byHourReminders[hour].medicinesIds.map(
          (medId) => medicines[medId],
        );

        return {hour, medicines: mappedMedicines};
      });
  },
);
