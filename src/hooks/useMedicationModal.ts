import {useAppDispatch} from './reduxHooks';
import {
  showMedicationModal,
  hideMedicationModal,
} from 'src/redux/slices/medication_modal/actions';
import type {Medication} from 'src/types';
import {useCallback} from 'react';

export default () => {
  const dispatch = useAppDispatch();

  return {
    showNewMedicationModal: useCallback(
      () => dispatch(showMedicationModal()),
      [],
    ),
    showUpdateMedicationModal: (data: Medication) =>
      dispatch(showMedicationModal(data)),
    hideMedicationModal: useCallback(() => dispatch(hideMedicationModal()), []),
  };
};
