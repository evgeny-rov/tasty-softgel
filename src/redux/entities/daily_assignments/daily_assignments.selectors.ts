import {createSelector} from 'reselect';
import {
  getAssignmentsWithMedicines,
  getMedicinesSuppliesByHour,
} from '../assignments/assignments.selectors';
import {AppStateType} from 'src/types';

export const getCurrentHour = (state: AppStateType) =>
  state.daily_assignments.currentHour;
export const getConfirmedDailyAssignmentsHours = (state: AppStateType) =>
  state.daily_assignments.confirmedHours;

export const getDailyAssignments = createSelector(
  [
    getAssignmentsWithMedicines,
    getMedicinesSuppliesByHour,
    getCurrentHour,
    getConfirmedDailyAssignmentsHours,
  ],
  (
    assignmentsWithMedicines,
    medicinesSupplies,
    currentDailyAssignmentsHour,
    getConfirmedDailyAssignmentsHours,
  ) =>
    Object.keys(assignmentsWithMedicines).map((hourId) => {
      const assignmentHour = Number(hourId);
      const medicines = assignmentsWithMedicines[hourId];
      const isSuppliesDepleted = medicinesSupplies[hourId].total < 1;
      const canBeConfirmed = !isSuppliesDepleted;
      const isAlreadyConfirmed = getConfirmedDailyAssignmentsHours.includes(
        assignmentHour,
      );

      return {
        assignmentHour,
        medicines,
        isSuppliesDepleted,
        isAlreadyConfirmed,
        canBeConfirmed,
        currentDailyAssignmentsHour,
      };
    }),
);
