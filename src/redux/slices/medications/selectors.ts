import {RootState} from 'src/redux/store';

export const getAllMedicationsIds = (state: RootState) =>
  state.medications.allIds;
export const getMedications = (state: RootState) => state.medications.byId;
export const getIsMedicationsInEmptyState = (state: RootState) =>
  state.medications.allIds.length === 0;

export const getMedicationById = (id: string) => (state: RootState) =>
  state.medications.byId[id];
