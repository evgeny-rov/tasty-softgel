import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BellIcon} from '@icons/';
import {AppStateType, Medicine} from 'src/types';
import {common, theme, typography} from '@styles/';
import {
  assignReminder,
  unassignReminder,
} from 'src/redux/shared/shared.actions';

const RemindersMedicinesListItem = (props: Medicine) => {
  const selectedHour = useSelector(
    (state: AppStateType) => state.pickerSelectedValue,
  );
  const dispatch = useDispatch();

  const isAssignedToSelectedHour = props.reminders.some(
    (hour) => hour === selectedHour,
  );

  const toggleReminderStatus = () => {
    if (isAssignedToSelectedHour) {
      dispatch(unassignReminder({medicineId: props.id, hour: selectedHour}));
    } else {
      dispatch(assignReminder({medicineId: props.id, hour: selectedHour}));
    }
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
        onPress={toggleReminderStatus}>
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
