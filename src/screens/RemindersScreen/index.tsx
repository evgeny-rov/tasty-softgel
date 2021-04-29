import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';

import BgImage from '../../components/BgImage';
import MedicineList from './MedicineList';
import hourToTimeString from '../../utils/hourToTimeString';
import {typography} from '@styles/';

const HOURS_AS_TIME_STRING = Array(24)
  .fill(null)
  .map((_, idx) => hourToTimeString(idx));

const RemindersScreen = () => {
  const [pickerSelectedHour, setPickerSelectedHour] = useState(12);

  const pickerValueChangeHandler = (val: number) => {
    if (val === pickerSelectedHour) {
      return;
    }
    setPickerSelectedHour(val);
  };

  return (
    <>
      <BgImage source={require('../../assets/images/bg_03.jpg')} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.styles.h1}>Напоминания по часам</Text>
        </View>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            lineGradientColorFrom="#6d6767"
            lineGradientColorTo="#FFF"
            selectedValue={pickerSelectedHour}
            onValueChange={pickerValueChangeHandler}>
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
  container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'},
  header: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: 20,
  },
  picker_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(200, 0, 0, 0.5)'
  },
  picker: {
    flex: 0,
    width: '80%',
    height: '80%',
  },
  list_container: {
    flex: 2,
    // backgroundColor: 'rgba(23, 23, 77, 0.1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});

export default RemindersScreen;
