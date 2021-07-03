import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getMedicinesWithAssignmentsHours} from 'src/redux/entities/medicines/medicines.selectors';
import MedicineListItem from './MedicineListItem';

type Props = {
  pickerSelectedHour: number;
};

const RemindersMedicinesList = ({pickerSelectedHour}: Props) => {
  const medicinesList = useSelector(getMedicinesWithAssignmentsHours);

  return (
    <ScrollView
      bounces
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medicinesList.map(({medicine, assignments}) => (
        <MedicineListItem
          key={medicine.id}
          medicine={medicine}
          assignment={assignments.find(({hour}) => hour === pickerSelectedHour)}
          pickerSelectedHour={pickerSelectedHour}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default RemindersMedicinesList;
