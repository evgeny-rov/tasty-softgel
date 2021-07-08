import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Medicine} from 'src/types';
import {HOURS_AS_TIME_STRING} from '@constants/';
import {confirmConsumption} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import Icon from '@components/Icon';
import SizedBox from '@components/SizedBox';
import {common, theme, typography} from 'src/styles';

interface Props {
  assignmentHour: number;
  medicines: Medicine[];
  isSuppliesDepleted: boolean;
  isConfirmed: boolean;
  canBeConfirmed: boolean;
  isUIActive: boolean;
}

const MedicinesSublistItem = ({medicine}: {medicine: Medicine}) => {
  // todo: add some kind of indicator that medicine supply is depleted, probably animation

  return (
    <View style={styles.medicine_item_container}>
      <Text style={[typography.styles.body_bold]}>{medicine.name}</Text>
    </View>
  );
};

export default ({
  assignmentHour,
  medicines,
  isSuppliesDepleted,
  isConfirmed,
  canBeConfirmed,
  isUIActive,
}: Props) => {
  const dispatch = useDispatch();

  const confirmAction = () =>
    dispatch(confirmConsumption(assignmentHour, medicines));

  const aggregatedContainerStyles = {
    ...styles.container,
    ...styles.container_shadow,
    backgroundColor:
      isUIActive && canBeConfirmed ? theme.colors.accent : 'transparent',
    shadowColor:
      isUIActive && canBeConfirmed ? theme.colors.accent_dark : 'transparent',
    opacity: isSuppliesDepleted ? 0.4 : 1,
  };

  const shouldShowIcon = isConfirmed || canBeConfirmed;

  return (
    <Pressable
      style={aggregatedContainerStyles}
      disabled={!canBeConfirmed}
      onPress={confirmAction}
      android_ripple={{color: theme.colors.accent}}>
      <View style={[styles.section, styles.header]}>
        <View style={[common.styles.row, common.styles.centered_vertically]}>
          <Text style={[typography.styles.body_bold, styles.header_text]}>
            {HOURS_AS_TIME_STRING[assignmentHour]}
          </Text>
          <SizedBox width={20} />
          <Icon
            name="pills"
            size={12}
            color={isSuppliesDepleted ? theme.colors.primary : 'transparent'}
          />
        </View>
        <Icon
          name={isConfirmed ? 'done' : 'alarm'}
          color={shouldShowIcon ? theme.colors.primary : 'transparent'}
        />
      </View>
      <View style={[styles.section, styles.medicine_list_container]}>
        {medicines.map((medicine) => (
          <MedicinesSublistItem key={medicine.id} medicine={medicine} />
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  container_shadow: {
    elevation: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3.84,
    shadowOpacity: 1,
  },
  section: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
  },
  header_text: {
    fontSize: 12,
  },
  medicine_list_container: {
    flexWrap: 'wrap',
  },
  medicine_item_container: {
    paddingRight: 25,
  },
});
