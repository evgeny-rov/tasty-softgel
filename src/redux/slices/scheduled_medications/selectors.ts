import {mapValues} from 'lodash';
import {createSelector} from 'reselect';
import {RootState} from 'src/redux/store';
import {getMedications} from '../medications/selectors';

import type {DailyMedication} from 'src/types';

type DerivedScheduleByHoursInner = Record<string, DailyMedication>;
type DerivedScheduleByHours = Record<
  number,
  DerivedScheduleByHoursInner | undefined
>;

type DerivedScheduleByMedicationIdInner = Record<number, DailyMedication>;
type DerivedScheduleByMedicationId = Record<
  string,
  DerivedScheduleByMedicationIdInner | undefined
>;

interface derivedDailyScheduleData {
  allHoursIds: string[];
  byHourId: DerivedScheduleByHours;
  byMedicationId: DerivedScheduleByMedicationId;
}

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
    const derivedDailyScheduleData: derivedDailyScheduleData = {
      allHoursIds: [],
      byHourId: {},
      byMedicationId: {},
    };

    for (const id in daily_medications) {
      const {medicationId, hourId} = daily_medications[id];

      derivedDailyScheduleData.byHourId[hourId] = {
        ...(derivedDailyScheduleData.byHourId[hourId] ?? {}),
        [medicationId]: {id, medicationId, hourId},
      };

      derivedDailyScheduleData.byMedicationId[medicationId] = {
        ...(derivedDailyScheduleData.byMedicationId[medicationId] ?? {}),
        [hourId]: {id, medicationId, hourId},
      };
    }

    derivedDailyScheduleData.allHoursIds = Object.keys(
      derivedDailyScheduleData.byHourId,
    );

    return derivedDailyScheduleData;
  },
);

export const getConfirmableMedicationsByHourId = createSelector(
  [getMedicationsSchedule, getMedications],
  (medicationsSchedule, medications) => {
    return mapValues(medicationsSchedule.byHourId, (scheduledData) => {
      const nonEmptyMappedMedications = [];

      for (const medicationId in scheduledData) {
        const medication = medications[medicationId];

        if (medication.quantity === 0) {
          continue;
        } else {
          nonEmptyMappedMedications.push(medication);
        }
      }

      return nonEmptyMappedMedications;
    });
  },
);

export const getTodaySchedule = createSelector(
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
  ) => {
    return mapValues(medicationsSchedule.byHourId, (_, hourKey) => {
      const hourId = Number(hourKey);
      const isSuppliesDepleted =
        confirmableMedicationsByHourId[hourId].length === 0;
      const isMatchingCurrentHour = hourId === hourIdNow;
      const isInactive = isSuppliesDepleted || hourId > hourIdNow;
      const isAlreadyConfirmed = confirmedHourIds.includes(hourId);

      return {
        isSuppliesDepleted,
        isMatchingCurrentHour,
        isInactive,
        isAlreadyConfirmed,
      };
    });
  },
);
