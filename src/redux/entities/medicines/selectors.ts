import {createSelector} from 'reselect';
import {MedicinesState} from 'src/types';

const getIds = (state: MedicinesState) => state.allIds;
const getMedicines = (state: MedicinesState) => state.byId;

export const allMedicinesSelector = createSelector(
  [getIds, getMedicines],
  (ids, medicines) => ids.map((id) => medicines[id]),
);
