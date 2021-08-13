import {createSelector} from 'reselect';
import {RootState} from 'src/redux/store';

export const getAllMedicationsIds = (state: RootState) => state.medications.allIds;
export const getMedications = (state: RootState) => state.medications.byId;

export const getAllMedications = createSelector(
  [getAllMedicationsIds, getMedications],
  (ids, medications) => {
    return ids.map((id) => medications[id]);
  },
);
