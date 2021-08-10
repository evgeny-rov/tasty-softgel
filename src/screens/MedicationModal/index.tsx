import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';

import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import {
  addMedication,
  removeMedication,
  updateMedication,
} from 'src/redux/slices/medications/actions';
import useMedicationModal from 'src/hooks/useMedicationModal';

import ModalHeader from './components/ModalHeader';
import ModalAmountCounter from './components/ModalAmountCounter';
import ModalButtons from './components/ModalButtons';
import SizedBox from '@components/SizedBox';
import {common, theme, typography} from '@styles/';

const MED_DEFAULT_HEADER_TITLE = 'Новое лекарство';
const MED_DEFAULT_NAME = '';
const MED_DEFAULT_COUNT = 30;

const ModalContent = React.memo(() => {
  const medication = useAppSelector((state) => state.medication_modal.data);
  const dispatch = useAppDispatch();
  const {hideMedicationModal} = useMedicationModal();

  const [name, setName] = useState(medication?.name ?? MED_DEFAULT_NAME);
  const [quantity, setQuantity] = useState(
    medication?.quantity ?? MED_DEFAULT_COUNT,
  );
  const [isInEditMode, setIsInEditMode] = useState(!!medication);

  const handleSubmit = () => {
    const newMedicineData = {name, quantity};
    isInEditMode && medication
      ? dispatch(updateMedication({...medication, ...newMedicineData}))
      : dispatch(addMedication(newMedicineData));

    hideMedicationModal();
  };

  const handleRemove = () => {
    medication && dispatch(removeMedication({medicationId: medication.id}));
    hideMedicationModal();
  };

  return (
    <View style={styles.content_wrapper}>
      <View style={styles.section}>
        <ModalHeader
          headerTitle={isInEditMode ? name : MED_DEFAULT_HEADER_TITLE}
          onClose={hideMedicationModal}
        />
      </View>
      <SizedBox height={60} />
      <View style={styles.section}>
        <View style={common.styles.flex}>
          <Text style={typography.styles.h2}>Наименование:</Text>
          <TextInput
            style={styles.input_field}
            autoCapitalize="words"
            blurOnSubmit
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>
      <SizedBox height={50} />
      <View style={styles.section}>
        <Text style={typography.styles.h2}>Количество:</Text>
        <View style={styles.section}>
          <ModalAmountCounter count={quantity} setCount={setQuantity} />
        </View>
      </View>
      <ModalButtons
        isInEditMode={isInEditMode}
        disabled={name.trim().length < 2}
        onRemove={handleRemove}
        onSubmit={handleSubmit}
      />
    </View>
  );
});

const MedicationModal = () => {
  const isVisible = useAppSelector((state) => state.medication_modal.isVisible);
  const {hideMedicationModal} = useMedicationModal();

  return (
    <Modal
      swipeDirection="down"
      animationIn={'zoomInUp'}
      animationOut={'fadeOutDown'}
      isVisible={isVisible}
      coverScreen={true}
      hasBackdrop={true}
      swipeThreshold={100}
      statusBarTranslucent
      style={styles.modal}
      useNativeDriverForBackdrop
      useNativeDriver
      onBackdropPress={hideMedicationModal}
      onSwipeComplete={hideMedicationModal}
      onBackButtonPress={hideMedicationModal}>
      <ModalContent />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
    marginVertical: 0,
  },
  content_wrapper: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.384)',
  },
  section: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input_field: {
    marginTop: 10,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    padding: 5,
    borderBottomWidth: 1,
  },
});

export default React.memo(MedicationModal);
