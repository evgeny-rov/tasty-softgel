import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {medicinesSelector} from 'src/redux/entities/medicines/medicines.selectors';
import RemindersMedicinesListItem from './MedicineListItem';

type Props = {
  pickerSelectedHour: number;
};

const RemindersMedicinesList = ({pickerSelectedHour}: Props) => {
  const medicinesList = useSelector(medicinesSelector);

  return (
    <ScrollView
      bounces
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medicinesList.map((medicine) => {
        return (
          <RemindersMedicinesListItem
            key={medicine.id}
            medicine={medicine}
            pickerSelectedHour={pickerSelectedHour}
            isActive={medicine.reminders.includes(pickerSelectedHour)}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
});

export default RemindersMedicinesList;
