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
      const isConfirmed = getConfirmedDailyAssignmentsHours.includes(
        assignmentHour,
      );
      const canBeConfirmed =
        !isSuppliesDepleted &&
        !isConfirmed &&
        assignmentHour <= currentDailyAssignmentsHour;
      const isUIActive =
        !isSuppliesDepleted && assignmentHour === currentDailyAssignmentsHour;

      return {
        assignmentHour,
        medicines,
        isSuppliesDepleted,
        isConfirmed,
        canBeConfirmed,
        isUIActive,
      };
    }),
);
