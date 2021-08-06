import {createSelector} from 'reselect';
import {groupBy, mapValues} from 'lodash';
import {AppStateType} from 'src/types';

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
