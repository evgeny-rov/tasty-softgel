import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Medicine, Assignment} from 'src/types';
import {common, theme, typography} from '@styles/';
import {
  addAssignment,
  removeAssignment,
} from 'src/redux/entities/assignments/assignments.actions';
import Icon from '@components/Icon';

type Props = {
  medicine: Medicine;
  assignment: Assignment | undefined;
  pickerSelectedHour: number;
};

const RemindersMedicinesListItem = ({
  medicine,
  pickerSelectedHour,
  assignment,
}: Props) => {
  const dispatch = useDispatch();

  const toggleAssignmentStatus = () => {
    if (assignment) {
      dispatch(removeAssignment({id: assignment.id}));
    } else {
      dispatch(
        addAssignment({medicineId: medicine.id, hour: pickerSelectedHour}),
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
        onPress={toggleAssignmentStatus}>
        <Icon
          name={assignment ? 'notifications' : 'notifications_none'}
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
