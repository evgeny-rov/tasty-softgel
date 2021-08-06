import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';
import {getConfirmableMedicinesByHour} from '../medicines/medicines.selectors';

export const getCurrentHour = (state: AppStateType) =>
  state.daily_assignments.currentHour;
export const getConfirmedDailyAssignmentsHours = (state: AppStateType) =>
  state.daily_assignments.confirmedHours;

export const getDailyAssignments = createSelector(
  [
    getConfirmableMedicinesByHour,
    getCurrentHour,
    getConfirmedDailyAssignmentsHours,
  ],
  (confirmableMedicinesByHour, currentHour, confirmedAssignments) =>
    Object.keys(confirmableMedicinesByHour).map((hourId) => {
      const assignmentHour = Number(hourId);
      const medicines = confirmableMedicinesByHour[hourId];
      const isSuppliesDepleted = medicines.length === 0;
      const isInactive = isSuppliesDepleted || assignmentHour > currentHour;
      const isAlreadyConfirmed = confirmedAssignments.includes(assignmentHour);

      return {
        assignmentHour,
        isAlreadyConfirmed,
        isSuppliesDepleted,
        isInactive,
        medicines,
      };
    }),
);
