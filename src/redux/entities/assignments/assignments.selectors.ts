import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';
import {groupBy, mapValues} from 'lodash';
import groupMedicinesBySupply from 'src/utils/groupMedicinesBySupply';

const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAssignments = (state: AppStateType) => state.assignments.byId;

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
