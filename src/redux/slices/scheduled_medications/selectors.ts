import {mapValues} from 'lodash';
import {createSelector} from 'reselect';
import {RootState} from 'src/redux/store';
import {getMedications} from '../medications/selectors';

import type {Medication} from 'src/types';

type scheduleData = {
  allHoursIds: string[];
  byHourId: {[hourId: number]: string[]};
  byMedicationId: {[medicationId: string]: number[]};
};

export const getHourIdNow = (state: RootState) =>
  state.scheduled_medications.hourIdNow;
export const getConfirmedHourIds = (state: RootState) =>
  state.scheduled_medications.confirmedHourIds;
export const getLastConfirmationTimestamp = (state: RootState) =>
  state.scheduled_medications.lastConfirmationAt;
export const getDailyMedications = (state: RootState) =>
  state.scheduled_medications.daily_medications;

export const getMedicationsSchedule = createSelector(
  [getDailyMedications],
  (daily_medications) => {
    const scheduleData: scheduleData = {
      allHoursIds: [],
      byHourId: {},
      byMedicationId: {},
    };

    for (const daily_medication of daily_medications) {
      const {medicationId, hourId} = daily_medication;

      scheduleData.byHourId[hourId] = [
        ...(scheduleData.byHourId[hourId] ?? []),
        medicationId,
      ];

      scheduleData.byMedicationId[medicationId] = [
        ...(scheduleData.byMedicationId[medicationId] ?? []),
        hourId,
      ].sort((a, b) => a - b);
    }

    scheduleData.allHoursIds = Object.keys(scheduleData.byHourId);

    return scheduleData;
  },
);

export const getConfirmableMedicationsByHourId = createSelector(
  [getMedicationsSchedule, getMedications],
  (medicationsSchedule, medications) => {
    return mapValues(medicationsSchedule.byHourId, (medicationsIds) =>
      medicationsIds.reduce<Medication[]>((accMedications, id) => {
        const medication = medications[id];

        medication.quantity > 0 && accMedications.push(medication);
        return accMedications;
      }, []),
    );
  },
);

export const getDailyScheduledMedications = createSelector(
  [
    getMedicationsSchedule,
    getHourIdNow,
    getConfirmedHourIds,
    getConfirmableMedicationsByHourId,
  ],
  (
    medicationsSchedule,
    hourIdNow,
    confirmedHourIds,
    confirmableMedicationsByHourId,
  ) =>
    medicationsSchedule.allHoursIds.map((hourKey) => {
      const hourId = Number(hourKey);
      const isSuppliesDepleted =
        confirmableMedicationsByHourId[hourId].length === 0;
      const isMatchingCurrentHour = hourId === hourIdNow;
      const isInactive = isSuppliesDepleted || hourId > hourIdNow;
      const isAlreadyConfirmed = confirmedHourIds.includes(hourId);

      return {
        hourId,
        isSuppliesDepleted,
        isMatchingCurrentHour,
        isInactive,
        isAlreadyConfirmed,
      };
    }),
);
