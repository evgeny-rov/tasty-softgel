import {useAppDispatch} from './reduxHooks';
import {
  showMedicationModal,
  hideMedicationModal,
} from 'src/redux/slices/medication_modal/actions';
import type {Medication} from 'src/types';

export default () => {
  const dispatch = useAppDispatch();

  return {
    showNewMedicationModal: () => dispatch(showMedicationModal()),
    showUpdateMedicationModal: (data: Medication) =>
      dispatch(showMedicationModal(data)),
    hideMedicationModal: () => dispatch(hideMedicationModal()),
  };
};
