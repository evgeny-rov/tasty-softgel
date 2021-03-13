import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {sharedActions} from '../../redux/sharedActions';
import {BellIcon} from '@icons/';
import {AppState, Medicine} from 'src/types';
import {common, theme, typography} from '@styles/';

const RemindersMedicinesListItem = (props: Medicine) => {
  const selectedHour = useSelector((state: AppState) => state.picker.value);
  const dispatch = useDispatch();

  const isAssignedToSelectedHour = props.reminders.includes(selectedHour);

  const updateAssignedStatus = () => {
    return isAssignedToSelectedHour
      ? dispatch(
          sharedActions.unassignReminder({
            hour: selectedHour,
            medicineId: props.id,
          }),
        )
      : dispatch(
          sharedActions.assignReminder({
            hour: selectedHour,
            medicineId: props.id,
          }),
        );
  };

  return (
    <View style={styles.container}>
      <View style={common.styles.col}>
        <Text style={typography.styles.body}>{props.name}</Text>
        <Text style={typography.styles.body_sub_gray}>
          {props.currentAmount} шт.
        </Text>
      </View>
      <Pressable
        android_ripple={theme.configs.ripple_sm}
        hitSlop={15}
        onPress={updateAssignedStatus}>
        <BellIcon
          fill={isAssignedToSelectedHour ? theme.colors.primary : 'transparent'}
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
