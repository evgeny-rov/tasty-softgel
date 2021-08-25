import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useAppDispatch} from 'src/hooks/reduxHooks';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {
  addMedication,
  removeMedication,
  updateMedication,
} from 'src/redux/slices/medications/actions';

import SizedBox from '@components/SizedBox';
import ModalHeader from './components/ModalHeader';
import ModalAmountCounter from './components/ModalAmountCounter';
import ModalButtons from './components/ModalButtons';
import {common, theme, typography} from '@styles/';
import type {Medication} from 'src/types';
import useSwipeDown from 'src/hooks/useSwipeDown';

const MED_DEFAULT_HEADER_TITLE = 'Новое лекарство';

type Props = {
  medication: Medication;
  isInEditMode: boolean;
};

const MedicationModalContent = ({medication, isInEditMode}: Props) => {
  const dispatch = useAppDispatch();
  const {hideMedicationModal} = useMedicationModal();
  const swipeDownResponderProps = useSwipeDown(150, hideMedicationModal);

  const [name, setName] = useState(medication.name);
  const [quantity, setQuantity] = useState(medication.quantity);

  const validNameValue = name.trim();

  const handleSubmit = () => {
    const combinedData = {...medication, name: validNameValue, quantity};
    const appropriateAction = isInEditMode ? updateMedication : addMedication;

    dispatch(appropriateAction(combinedData));
    hideMedicationModal();
  };

  const handleRemove = () => {
    dispatch(removeMedication({medicationId: medication.id}));
    hideMedicationModal();
  };

  const requestRemove = () => {
    if (isInEditMode) {
      Alert.alert(
        'Подтверждение',
        'Вы уверены что хотите удалить это лекарство?',
        [
          {text: 'Отменить', style: 'cancel'},
          {text: 'Удалить', onPress: handleRemove, style: 'destructive'},
        ],
      );
    } else {
      return;
    }
  };

  return (
    <LinearGradient
      colors={['rgba(85, 81, 122, 0.8)', 'rgba(17, 16, 24, 0.8)']}
      style={styles.container}
      {...swipeDownResponderProps}>
      <View style={styles.section}>
        <ModalHeader
          headerTitle={
            validNameValue.length > 0 ? name : MED_DEFAULT_HEADER_TITLE
          }
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
            autoCorrect
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
        disabled={validNameValue.length < 2}
        onSubmit={handleSubmit}
        {...(isInEditMode && {onRemove: requestRemove})}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    overflow: 'hidden',
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

export default MedicationModalContent;
