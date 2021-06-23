import {createSelector} from 'reselect';
import {AppStateType, Medicine} from 'src/types';
import {groupBy, mapValues} from 'lodash';

const MEDICINE_SUPPLY_DEPLETES_SOON_THRESHOLD = 5;
const MEDICINE_SUPPLY_ALMOST_DEPLETED_THRESHOLD = 1;

const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAssignments = (state: AppStateType) => state.assignments.byId;
const getCurrentConsumptionHour = (state: AppStateType) =>
  state.consumptions.currentHour;
const getCurrentlyConfirmedHours = (state: AppStateType) =>
  state.consumptions.confirmedHours;

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
    const groupBySupply = (medicines: Medicine[]) => {
      const resultingSupply = {
        total: 0,
        depletes_soon: [] as Medicine[],
        almost_depleted: [] as Medicine[],
      };

      for (const medicine of medicines) {
        if (medicine.count === MEDICINE_SUPPLY_DEPLETES_SOON_THRESHOLD) {
          resultingSupply.depletes_soon.push(medicine);
        } else if (
          medicine.count === MEDICINE_SUPPLY_ALMOST_DEPLETED_THRESHOLD
        ) {
          resultingSupply.almost_depleted.push(medicine);
        }

        resultingSupply.total += medicine.count;
      }

      return resultingSupply;
    };

    return mapValues(assignmentsWithMedicines, groupBySupply);
  },
);

export const getDailyAssignments = createSelector(
  [
    getAssignmentsWithMedicines,
    getMedicinesSuppliesByHour,
    getCurrentConsumptionHour,
    getCurrentlyConfirmedHours,
  ],
  (
    assignmentsWithMedicines,
    medicinesSupplies,
    currentConsumptionHour,
    currentlyConfirmedHours,
  ) =>
    Object.keys(assignmentsWithMedicines).map((hourId) => {
      const assignmentHour = Number(hourId);
      const medicines = assignmentsWithMedicines[hourId];
      const isSuppliesDepleted = medicinesSupplies[hourId].total < 1;
      const canBeConfirmed =
        !isSuppliesDepleted &&
        !currentlyConfirmedHours.includes(assignmentHour) &&
        assignmentHour <= currentConsumptionHour;
      const isUIActive =
        !isSuppliesDepleted && assignmentHour === currentConsumptionHour;

      return {
        assignmentHour,
        medicines,
        isSuppliesDepleted,
        canBeConfirmed,
        isUIActive,
      };
    }),
);
