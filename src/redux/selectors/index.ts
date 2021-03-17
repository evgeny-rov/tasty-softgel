import {createSelector} from 'reselect';
import {AppState} from 'src/types';

const getIds = (state: AppState) => state.allIds;
const getMedicines = (state: AppState) => state.byId;

export const medicinesSelector = createSelector(
  [getIds, getMedicines],
  (ids, medicines) => ids.map((id) => medicines[id]),
);

export const byHourMedicinesSelector = createSelector(
  [medicinesSelector],
  (medicines) => {
    const reducedByHour = medicines.reduce(
      (acc: {[hour: string]: string[]}, medicine) => {
        medicine.hours.forEach((hour) => {
          const currentNames = acc[hour] || [];
          acc[hour] = [...currentNames, medicine.name];
        });

        return acc;
      },
      {},
    );

    return Object.keys(reducedByHour).map((hour) => ({
      hour,
      medicinesNames: reducedByHour[hour],
    }));
  },
);
