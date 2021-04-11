import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {BellIcon} from '@icons/';
import {Medicine} from 'src/types';
import {common, theme, typography} from '@styles/';
import {
  assignReminder,
  unassignReminder,
} from 'src/redux/entities/reminders/reminders.actions';

type medicine = {
  medicine: Medicine;
  pickerSelectedHour: number;
  isActive: boolean;
};

const RemindersMedicinesListItem = ({
  medicine,
  isActive,
  pickerSelectedHour,
}: medicine) => {
  const dispatch = useDispatch();

  const toggleReminderStatus = () => {
    if (isActive) {
      dispatch(
        unassignReminder({medicineId: medicine.id, hour: pickerSelectedHour}),
      );
    } else {
      dispatch(
        assignReminder({medicineId: medicine.id, hour: pickerSelectedHour}),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={common.styles.col}>
        <Text style={typography.styles.body}>{medicine.name}</Text>
        <Text style={typography.styles.body_sub_gray}>
          {medicine.currentAmount} шт.
        </Text>
      </View>
      <Pressable
        android_ripple={theme.configs.ripple_sm}
        hitSlop={15}
        onPress={toggleReminderStatus}>
        <BellIcon
          fill={isActive ? theme.colors.primary : 'transparent'}
          stroke={theme.colors.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default RemindersMedicinesListItem;
