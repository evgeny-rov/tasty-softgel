import {useCallback} from 'react';
import {Keyboard} from 'react-native';
import {useAppDispatch} from './reduxHooks';
import {
  showMedicationModal,
  hideMedicationModal,
} from 'src/redux/slices/medication_modal/actions';
import type {Medication} from 'src/types';

export default () => {
  const dispatch = useAppDispatch();

  const showNewModal = useCallback(() => {
    dispatch(showMedicationModal());
  }, []);

  const showEditModal = (data: Medication) =>
  dispatch(showMedicationModal(data));

  const hideModal = useCallback(() => {
    dispatch(hideMedicationModal());
    Keyboard.dismiss();
  }, []);

  return {
    showNewMedicationModal: showNewModal,
    showUpdateMedicationModal: showEditModal, 
    hideMedicationModal: hideModal,
  };
};
