import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Medicine} from 'src/types';

import {common, typography} from '@styles/';
import hourToTimeString from 'src/utils/hourToTimeString';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {removeMedicine} from 'src/redux/entities/medicines/medicines.actions';

const MedicineListItem = (medicine: Medicine) => {
  const dispatch = useDispatch();
  const remindersAsHoursString = medicine.reminders
    .map(hourToTimeString)
    .sort()
    .join(', ');

  const removeItem = () => dispatch(removeMedicine({medicine}));

  return (
    <View style={styles.container}>
      <View style={[common.styles.row, common.styles.spaced]}>
        <Button title="remove" onPress={removeItem}></Button>
        <View style={common.styles.flex}>
          <Text style={typography.styles.body_bold}>{medicine.name}</Text>
        </View>
        <View>
          <Text style={typography.styles.body_sm}>
            {medicine.currentAmount} шт.
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.padded}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Text numberOfLines={1} style={typography.styles.body_sub_gray}>
          {remindersAsHoursString}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  padded: {
    paddingTop: 5,
  },
});

export default MedicineListItem;
