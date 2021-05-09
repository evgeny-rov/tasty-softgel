import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';
import {groupBy} from 'lodash';

const getMedicines = (state: AppStateType) => state.medicines.byId;
const getAssignments = (state: AppStateType) => state.assignments.byId;
const getCurrentConsumptionHour = (state: AppStateType) =>
  state.consumptions.currentHour;
const getCurrentlyConfirmedHours = (state: AppStateType) =>
  state.consumptions.confirmedHours;

export const assignmentsByHourSelector = createSelector(
  [
    getMedicines,
    getAssignments,
    getCurrentConsumptionHour,
    getCurrentlyConfirmedHours,
  ],
  (medicines, assignments, currentConsumptionHour, currentlyConfirmedHours) => {
    const assignmentsByAssignedHour = groupBy(assignments, 'hour');

    const getMedicinesIds = (hour: number) => {
      const assignments = assignmentsByAssignedHour[hour] || [];
      return assignments.map(({medicineId}) => medicineId);
    };

    const assignmentsWithMedicines = Object.keys(assignmentsByAssignedHour).map(
      (hourKey) => {
        const hour = Number(hourKey);

        return {
          hour,
          medicinesIds: getMedicinesIds(hour),
          isActive: hour === currentConsumptionHour,
          canBeConfirmed:
            !currentlyConfirmedHours.includes(hour) &&
            hour <= currentConsumptionHour,
        };
      },
    );

    return assignmentsWithMedicines;
  },
);
