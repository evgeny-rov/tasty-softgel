import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Medicine} from 'src/types';
import {common, theme, typography} from '@styles/';
import {
  assignMedicine,
  unassignMedicine,
} from 'src/redux/entities/assignments/assignments.actions';
import Icon from '@components/Icon';

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
        unassignMedicine({medicineId: medicine.id, hour: pickerSelectedHour}),
      );
    } else {
      dispatch(
        assignMedicine({medicineId: medicine.id, hour: pickerSelectedHour}),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={common.styles.col}>
        <Text style={typography.styles.body}>{medicine.name}</Text>
        <Text style={typography.styles.body_sub_gray}>
          {medicine.count} шт.
        </Text>
      </View>
      <Pressable
        android_ripple={theme.configs.ripple_sm}
        hitSlop={15}
        onPress={toggleReminderStatus}>
        <Icon
          name={isActive ? 'notifications' : 'notifications_none'}
          color={theme.colors.primary}
          size={24}
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
