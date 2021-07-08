import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';
import {groupBy, mapValues} from 'lodash';
import groupMedicinesBySupply from 'src/utils/groupMedicinesBySupply';

const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAssignments = (state: AppStateType) => state.assignments.byId;
const getCurrentDailyAssignmentsHour = (state: AppStateType) =>
  state.daily_assignments.currentHour;
const getConfirmedDailyAssignmentsHours = (state: AppStateType) =>
  state.daily_assignments.confirmedHours;

export const getAssignmentsByHour = createSelector(
  [getAssignments],
  (assignments) => groupBy(assignments, 'hour'),
);

export const getAssignmentsByMedicineId = createSelector(
  [getAssignments],
  (assignments) => groupBy(assignments, 'medicineId'),
);

export const getAssignmentsHoursByMedicineId = createSelector(
  [getAssignmentsByMedicineId],
  (assignmentsByMedId) => {
    return mapValues(assignmentsByMedId, (assignments) =>
      assignments.map(({hour}) => hour),
    );
  },
);

export const getAssignmentsWithMedicines = createSelector(
  [getAssignmentsByHour, getMedicines],
  (assignmentsByHour, medicines) => {
    return mapValues(assignmentsByHour, (assignments) =>
      assignments.map(({medicineId}) => medicines[medicineId]),
    );
  },
);

export const getMedicinesSuppliesByHour = createSelector(
  [getAssignmentsWithMedicines],
  (assignmentsWithMedicines) => {
    return mapValues(assignmentsWithMedicines, groupMedicinesBySupply);
  },
);

export const getDailyAssignments = createSelector(
  [
    getAssignmentsWithMedicines,
    getMedicinesSuppliesByHour,
    getCurrentDailyAssignmentsHour,
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
      const isConfirmed = getConfirmedDailyAssignmentsHours.includes(assignmentHour);
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
