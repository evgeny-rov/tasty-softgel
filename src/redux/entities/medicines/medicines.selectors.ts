import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';
import {getAssignmentsByMedicineId} from '../assignments/assignments.selectors';

const getMedicines = (state: AppStateType) => state.medicines.byId;

export const getMedicinesWithAssignmentsHours = createSelector(
  [getMedicines, getAssignmentsByMedicineId],
  (medicines, assignmentsByMedId) =>
    Object.keys(assignmentsByMedId).map((medicineId) => {
      return {
        medicine: medicines[medicineId],
        assignments: assignmentsByMedId[medicineId],
      };
    }),
);
