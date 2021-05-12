import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';

import BgImage from '../../components/BgImage';
import MedicineList from './components/MedicineList';
import hourToTimeString from '../../utils/hourToTimeString';
import {typography} from '@styles/';

const HOURS_AS_TIME_STRING = Array.from(Array(24).keys()).map(hourToTimeString);

const RemindersScreen = () => {
  const [pickerSelectedHour, setPickerSelectedHour] = useState(12);

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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
  header: {
    flex: 0,
  },
  picker_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    flex: 0,
    width: '80%',
    height: '80%',
  },
  list_container: {
    flex: 2,
    overflow: 'hidden',
  },
});

export default RemindersScreen;
