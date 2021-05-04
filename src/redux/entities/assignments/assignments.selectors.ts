import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';

const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAllHours = (state: AppStateType) => state.assignments.allHours;
const getByHoursAssignments = (state: AppStateType) => state.assignments.byHour;
const getCurrentConsumptionsHour = (state: AppStateType) =>
  state.consumptions.currentHour;
const getCurrentlyConfirmedHours = (state: AppStateType) =>
  state.consumptions.confirmedHours;

export const byHourMedicinesSelector = createSelector(
  [
    getMedicines,
    getAllHours,
    getByHoursAssignments,
    getCurrentConsumptionsHour,
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
