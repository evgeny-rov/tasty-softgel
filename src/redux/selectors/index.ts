import {createSelector} from 'reselect';
import {AppState} from 'src/types';

const getIds = (state: AppState) => state.allIds;
const getMedicines = (state: AppState) => state.byId;

export const allMedicinesSelector = createSelector(
  [getIds, getMedicines],
  (ids, medicines) => ids.map((id) => medicines[id]),
);
