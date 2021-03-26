import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';

const getMedicinesIds = (state: AppStateType) => state.medicines.allIds;
const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAllHours = (state: AppStateType) => state.reminders.allHours;
const getByHoursReminders = (state: AppStateType) => state.reminders.byHour;

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
