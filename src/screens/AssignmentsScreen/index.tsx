import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';

import {HOURS_AS_TIME_STRING} from '@constants/';
import MedicineList from './components/MedicineList';
import {common, typography} from '@styles/';

const AssignmentsScreen = () => {
  const [pickerSelectedHour, setPickerSelectedHour] = useState(12);

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
            {HOURS_AS_TIME_STRING.map((value, idx) => (
              <Picker.Item key={value} label={value} value={idx} />
            ))}
          </Picker>
        </View>
        <View style={styles.list_container}>
          <MedicineList pickerSelectedHour={pickerSelectedHour} />
        </View>
      </View>
    </>
  );
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
