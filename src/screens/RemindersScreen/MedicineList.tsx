import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {allMedicinesSelector} from '../../redux/selectors';
import RemindersMedicinesListItem from './MedicineListItem';

const RemindersMedicinesList = () => {
  const medicinesList = useSelector(allMedicinesSelector);

  return (
    <ScrollView
      bounces
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medicinesList.map((medicine) => {
        return (
          <RemindersMedicinesListItem
            key={medicine.name}
            id={medicine.id}
            name={medicine.name}
            currentAmount={medicine.currentAmount}
            intakeHours={medicine.intakeHours}
            initialAmount={30}
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
