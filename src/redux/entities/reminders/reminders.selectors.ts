import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';

const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAllHours = (state: AppStateType) => state.reminders.allHours;
const getByHoursReminders = (state: AppStateType) => state.reminders.byHour;
const getCurrentSystemHour = (state: AppStateType) => state.system.currentHour;
const getCurrentlyConfirmedHours = (state: AppStateType) =>
  state.system.consumptionConfirmedHours;

export const byHourMedicinesSelector = createSelector(
  [
    getMedicines,
    getAllHours,
    getByHoursReminders,
    getCurrentSystemHour,
    getCurrentlyConfirmedHours,
  ],
  (
    medicines,
    hours,
    byHourReminders,
    currentSystemHour,
    currentlyConfirmedHours,
  ) => {
    return hours
      .sort((a, b) => a - b)
      .map((hour) => {
        const mappedMedicines = byHourReminders[hour].medicinesIds.map(
          (medId) => medicines[medId],
        );

        return {
          hour,
          isActive: hour === currentSystemHour,
          canBeConfirmed:
            !currentlyConfirmedHours.includes(hour) &&
            hour <= currentSystemHour,
          medicines: mappedMedicines,
        };
      });
  },
);
