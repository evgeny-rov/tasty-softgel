import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';

import {HOURS_AS_TIME_STRING} from '@constants/';
import useMedicationModal from 'src/hooks/useMedicationModal';

import EmptyState from '@components/EmptyState';
import MedicationsList from './MedicationsList';
import {common, typography} from '@styles/';

const PICKER_DEFAULT_HOUR_ID = 12;

const PICKER_DATA = HOURS_AS_TIME_STRING.map((label, hourId) => (
  <Picker.Item key={hourId} label={label} value={hourId} />
));

const MedicationsSchedulerScreen = () => {
  const [pickerSelectedHourId, setPickerSelectedHourId] = useState(
    PICKER_DEFAULT_HOUR_ID,
  );
  const {showNewMedicationModal} = useMedicationModal();
  const isInEmptyState = false;

  if (!isInEmptyState) {
    return (
      <>
        <View style={common.styles.screen_container}>
          <View style={common.styles.header}>
            <Text style={typography.styles.h1}>Выбрать часы приема</Text>
          </View>
          <View style={styles.picker_container}>
            <Picker
              style={styles.picker}
              lineGradientColorFrom="#6d676728"
              lineGradientColorTo="#FFF"
              selectedValue={pickerSelectedHourId}
              onValueChange={setPickerSelectedHourId}>
              {PICKER_DATA}
            </Picker>
          </View>
          <View style={styles.list_container}>
            <MedicationsList selectedHourId={pickerSelectedHourId} />
          </View>
        </View>
      </>
    );
  } else {
    return (
      <EmptyState
        heading={'Сперва добавьте лекарства.'}
        message={
          'Чтобы запланировать время приема необходимо добавить лекарства.'
        }
        action={{
          content: 'Добавить лекарство',
          onPress: showNewMedicationModal,
        }}
      />
    );
  }
};

export const styles = StyleSheet.create({
  picker_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '80%',
  },
  list_container: {
    paddingHorizontal: 20,
    flex: 2,
    overflow: 'hidden',
  },
});

export default MedicationsSchedulerScreen;
