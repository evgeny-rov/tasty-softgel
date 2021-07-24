import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';

import {HOURS_AS_TIME_STRING} from '@constants/';
import useModalMedicine from 'src/hooks/useModalMedicine';

import MedicineList from './components/MedicineList';
import EmptyState from '@components/EmptyState';
import {common, typography} from '@styles/';
import {AppStateType} from 'src/types';

const PICKER_DATA = HOURS_AS_TIME_STRING.map((label, hourId) => (
  <Picker.Item key={hourId} label={label} value={hourId} />
));

const AssignmentsScreen = () => {
  const [pickerSelectedHour, setPickerSelectedHour] = useState(12);
  const {showModalNewMedicine} = useModalMedicine();
  const isInEmptyState =
    useSelector((state: AppStateType) => state.medicines.allIds).length === 0;

  if (!isInEmptyState) {
    return (
      <>
        <View style={common.styles.screen_container}>
          <View style={common.styles.header}>
            <Text style={typography.styles.h1}>Назначить прием</Text>
          </View>
          <View style={styles.picker_container}>
            <Picker
              style={styles.picker}
              lineGradientColorFrom="#6d676728"
              lineGradientColorTo="#FFF"
              selectedValue={pickerSelectedHour}
              onValueChange={setPickerSelectedHour}>
              {PICKER_DATA}
            </Picker>
          </View>
          <View style={styles.list_container}>
            <MedicineList pickerSelectedHour={pickerSelectedHour} />
          </View>
        </View>
      </>
    );
  } else {
    return (
      <EmptyState
        heading={'Сперва добавьте лекарства.'}
        message={'Чтобы назначить время приема необходимо добавить лекарства.'}
        action={{content: 'Добавить лекарство', onPress: showModalNewMedicine}}
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
    flex: 3,
    overflow: 'hidden',
  },
});

export default AssignmentsScreen;
