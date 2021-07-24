import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import {
  addMedicine,
  removeMedicine,
  updateMedicine,
} from 'src/redux/entities/medicines/medicines.actions';
import useModalMedicine from 'src/hooks/useModalMedicine';

import ModalHeader from './components/ModalHeader';
import ModalAmountCounter from './components/ModalAmountCounter';
import ModalButtons from './components/ModalButtons';
import SizedBox from '@components/SizedBox';
import {common, theme, typography} from '@styles/';

import {AppStateType} from 'src/types';

const MED_DEFAULT_HEADER_TITLE = 'Новое лекарство';
const MED_DEFAULT_NAME = '';
const MED_DEFAULT_COUNT = 30;

const ModalMedicine = () => {
  const {isVisible, data: medicine} = useSelector(
    (state: AppStateType) => state.modal_medicine,
  );

  const dispatch = useDispatch();
  const {hideModalMedicine} = useModalMedicine();
  const [name, setName] = useState(MED_DEFAULT_NAME);
  const [count, setCount] = useState(MED_DEFAULT_COUNT);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const onModalWillShow = () => {
    setName(medicine?.name ?? MED_DEFAULT_NAME);
    setCount(medicine?.count ?? MED_DEFAULT_COUNT);
    setIsInEditMode(Boolean(medicine));
  };

  const handleSubmit = () => {
    const newMedicineData = {name, count};
    isInEditMode && medicine
      ? dispatch(updateMedicine({...medicine, ...newMedicineData}))
      : dispatch(addMedicine(newMedicineData));

    hideModalMedicine();
  };

  const handleRemove = () => {
    medicine && dispatch(removeMedicine({medicine}));
    hideModalMedicine();
  };

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
      onBackdropPress={hideModalMedicine}
      onModalWillShow={onModalWillShow}
      onSwipeComplete={hideModalMedicine}
      onBackButtonPress={hideModalMedicine}>
      <View style={styles.content_wrapper}>
        <View style={styles.section}>
          <ModalHeader
            headerTitle={isInEditMode ? name : MED_DEFAULT_HEADER_TITLE}
            onClose={hideModalMedicine}
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
            <ModalAmountCounter count={count} setCount={setCount} />
          </View>
        </View>
        <ModalButtons
          isInEditMode={isInEditMode}
          disabled={name.trim().length < 2}
          onRemove={handleRemove}
          onSubmit={handleSubmit}
        />
      </View>
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

export default ModalMedicine;
