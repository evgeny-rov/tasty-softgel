import {createSelector} from 'reselect';
import {AppState} from 'src/types';

const getIds = (state: AppState) => state.medicines.allIds;
const getMedicines = (state: AppState) => state.medicines.byId;

export const medicinesSelector = createSelector(
  [getIds, getMedicines],
  (ids, medicines) => ids.map((id) => medicines[id]),
);