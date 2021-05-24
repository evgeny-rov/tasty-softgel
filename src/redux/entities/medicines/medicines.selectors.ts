import {groupBy} from 'lodash';
import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';

const getIds = (state: AppStateType) => state.medicines.allIds;
const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAssignments = (state: AppStateType) => state.assignments.byId;

export const medicinesSelector = createSelector(
  [getIds, getMedicines],
  (ids, medicines) => ids.map((id) => medicines[id]),
);

export const medicinesWithAssignmentsSelector = createSelector(
  [medicinesSelector, getAssignments],
  (medicines, assignments) => {
    const assignmentsByMedId = groupBy(assignments, 'medicineId');

    const getAssignments = (medicineId: string) => {
      const assignments = assignmentsByMedId[medicineId] || [];
      return assignments;
    };

    const medicinesWithAssignments = medicines.map((medicine) => {
      return {medicine, assignments: getAssignments(medicine.id)};
    });

    return medicinesWithAssignments;
  },
);
