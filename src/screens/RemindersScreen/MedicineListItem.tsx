import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BellIcon} from '@icons/';
import {AppState, Medicine} from 'src/types';
import {common, theme, typography} from '@styles/';
import { actions } from 'src/redux/actions';

const RemindersMedicinesListItem = (props: Medicine) => {
  const selectedHour = useSelector((state: AppState) => state.pickerSelectedValue);
  const dispatch = useDispatch();

  const isAssignedToSelectedHour = props.hours.some((hour) => hour === selectedHour);

  const updateStatus = () => dispatch(actions.updateReminders({hour: selectedHour, id: props.id}));

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
        onPress={updateStatus}>
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
