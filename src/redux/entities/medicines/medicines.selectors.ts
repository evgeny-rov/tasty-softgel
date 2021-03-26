import {createSelector} from 'reselect';
import {AppStateType} from 'src/types';

const getIds = (state: AppStateType) => state.medicines.allIds;
const getMedicines = (state: AppStateType) => state.medicines.byId;

export const medicinesSelector = createSelector(
  [getIds, getMedicines],
  (ids, medicines) => ids.map((id) => medicines[id]),
);