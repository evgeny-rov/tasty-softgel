import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Picker from '@gregfrench/react-native-wheel-picker';
import {pickerActions} from '../../redux/entities/picker/actions';

import BgImage from '../../components/BgImage';
import MedicineList from './MedicineList';
import hourToTimeString from '../../utils/hourToTimeString';
import {typography} from '@styles/';
import {AppState} from 'src/types';
import IconButton from '@components/IconButton';
import {ArrowIcon} from 'src/icons';

const HOURS_AS_STRING_ARRAY = Array(24)
  .fill(null)
  .map((_, idx) => hourToTimeString(idx));

const RemindersScreen = () => {
  const selectedHour = useSelector((state: AppState) => state.picker.value);
  const dispatch = useDispatch();

  const pickerValueChangeHandler = (val: number) => {
    console.log(val);
    if (val === selectedHour) {
      return;
    }
    console.log('dispatch')
    dispatch(pickerActions.updatePickerValue(val));
  };

  return (
    <>
      <BgImage source={require('../../assets/images/bg1.png')} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.styles.h1}>Напоминания по часам</Text>
        </View>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            lineGradientColorFrom="#1a1a1a"
            lineGradientColorTo="#FFF"
            selectedValue={selectedHour}
            onValueChange={pickerValueChangeHandler}>
            {HOURS_AS_STRING_ARRAY.map((value, idx) => (
              <Picker.Item key={value} label={value} value={idx} />
            ))}
          </Picker>
        </View>
        <View style={styles.list_container}>
          <MedicineList />
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'},
  header: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: 20,
  },
  picker_container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  list_container: {
    flex: 2,
    backgroundColor: 'rgba(23, 23, 77, 0.479)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});

export default RemindersScreen;
