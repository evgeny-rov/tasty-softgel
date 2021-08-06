import {createSelector} from 'reselect';
import {mapValues} from 'lodash';

import {
  getAssignmentsByHour,
  getAssignmentsByMedicineId,
} from '../assignments/assignments.selectors';
import {AppStateType, Medicine} from 'src/types';

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

export const getMedicinesByAssignmentHour = createSelector(
  [getAssignmentsByHour, getMedicines],
  (assignmentsByHour, medicines) => {
    return mapValues(assignmentsByHour, (assignments) =>
      assignments.map(({medicineId}) => medicines[medicineId]),
    );
  },
);

export const getConfirmableMedicinesByHour = createSelector(
  [getAssignmentsByHour, getMedicines],
  (assignmentsByHour, medicines) => {
    return mapValues(assignmentsByHour, (assignments) =>
      assignments.reduce<Medicine[]>((accMedicines, {medicineId}) => {
        const medicine = medicines[medicineId];
        if (medicine.count > 0) accMedicines.push(medicine);
        return accMedicines;
      }, []),
    );
  },
);
