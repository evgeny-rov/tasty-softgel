import {createSelector} from 'reselect';
import {getAssignmentsByMedicineId} from '../assignments/assignments.selectors';
import {AppStateType} from 'src/types';

const getIds = (state: AppStateType) => state.medicines.allIds;
const getMedicines = (state: AppStateType) => state.medicines.byId;

export const getMedicinesWithAssignmentsHours = createSelector(
  [getIds, getMedicines, getAssignmentsByMedicineId],
  (medicinesIds, medicines, assignmentsByMedId) =>
    medicinesIds.map((medicineId) => {
      return {
        medicine: medicines[medicineId],
        assignments: assignmentsByMedId[medicineId] || [],
      };
    }),
);
