import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {unassignTime, assignTime} from '../../redux/actions/actions';
import {BellIcon} from '@icons/';
import {AppState, Medicine} from 'src/types';
import {common, theme, typography} from 'src/styles';

const RemindersMedicinesListItem = (props: Medicine) => {
  const selectedHour = useSelector(
    (state: AppState) => state.selectedRemindersHour,
  );
  const dispatch = useDispatch();

  const isAssignedToSelectedHour = props.intakeHours.includes(selectedHour);

  const updateAssignedStatus = () => {
    return isAssignedToSelectedHour
      ? dispatch(unassignTime({hour: selectedHour, id: props.id}))
      : dispatch(assignTime({hour: selectedHour, id: props.id}));
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
