import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {HOURS_AS_TIME_STRING} from 'src/constants/constants';
import {
  confirmConsumption,
  confirmConsumptionUntested,
} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import Icon from '@components/Icon';
import SizedBox from '@components/SizedBox';
import {theme, typography} from 'src/styles';
import {Medicine} from 'src/types';
import {getMedicinesByAssignmentHour} from 'src/redux/entities/medicines/medicines.selectors';

interface Props {
  assignmentHour: number;
  isAlreadyConfirmed: boolean;
  isSuppliesDepleted: boolean;
  isInactive: boolean;
}

const MedicinesSublistItem = React.memo((medicine: Medicine) => {
  const textStyle: StyleProp<TextStyle> = {
    ...typography.styles.body_bold,
    fontStyle: medicine.count === 0 ? 'italic' : 'normal',
    textDecorationLine: medicine.count === 0 ? 'line-through' : 'none',
  };

  return (
    <View style={styles.medicine_item_container}>
      <Text style={textStyle}>{medicine.name}</Text>
    </View>
  );
});

const StatusBar = React.memo(
  ({
    hour,
    isAlreadyConfirmed,
    isSuppliesDepleted,
  }: {
    hour: number;
    isAlreadyConfirmed: boolean;
    isSuppliesDepleted: boolean;
  }) => {
    return (
      <>
        <Text style={styles.header_text}>{HOURS_AS_TIME_STRING[hour]}</Text>
        <SizedBox width={20} />
        <Icon
          name={isAlreadyConfirmed ? 'done' : 'pills'}
          color={theme.colors.primary}
          size={12}
        />
        {isSuppliesDepleted && (
          <Text
            style={[styles.header_text, {marginLeft: 20}]}
            adjustsFontSizeToFit>
            Лекарства закончились
          </Text>
        )}
      </>
    );
  },
);

const StatusIndicator = React.memo(
  ({
    isInactive,
    isAlreadyConfirmed,
  }: {
    isInactive: boolean;
    isAlreadyConfirmed: boolean;
  }) => {
    const backgroundColor = isAlreadyConfirmed
      ? theme.colors.accent2
      : theme.colors.primary;
    const opacity = isInactive ? 0 : 1;

    return (
      <SizedBox style={[styles.status_indicator, {backgroundColor, opacity}]} />
    );
  },
);

const MedicinesList = React.memo(
  ({assignmentHour}: {assignmentHour: number}) => {
    const medicines = useSelector(getMedicinesByAssignmentHour)[assignmentHour];
    return (
      <>
        {medicines.map((medicine) => (
          <MedicinesSublistItem key={medicine.id} {...medicine} />
        ))}
      </>
    );
  },
);

const DailyAssignmentsListItem = React.memo(
  ({
    assignmentHour,
    isAlreadyConfirmed,
    isSuppliesDepleted,
    isInactive,
  }: Props) => {
    const dispatch = useDispatch();
    const confirmAction = () => {
      dispatch(confirmConsumptionUntested(assignmentHour));
    };

    return (
      <View style={[styles.container, {opacity: isInactive ? 0.5 : 1}]}>
        <StatusIndicator
          isInactive={isInactive}
          isAlreadyConfirmed={isAlreadyConfirmed}
        />
        <Pressable
          disabled={isSuppliesDepleted}
          onLongPress={confirmAction}
          android_ripple={theme.configs.full}
          style={styles.content_wrapper}>
          <View style={styles.section}>
            <StatusBar
              hour={assignmentHour}
              isAlreadyConfirmed={isAlreadyConfirmed}
              isSuppliesDepleted={isSuppliesDepleted}
            />
          </View>
          <SizedBox height={10} />
          <View style={[styles.section, styles.medicine_list_container]}>
            <MedicinesList assignmentHour={assignmentHour} />
          </View>
        </Pressable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 7,
    overflow: 'hidden',
  },
  content_wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  status_indicator: {
    position: 'absolute',
    left: 0,
    zIndex: 50,
    height: '100%',
    width: 5,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_text: {
    ...typography.styles.body_bold,
    fontSize: 12,
  },
  medicine_list_container: {
    flexWrap: 'wrap',
  },
  medicine_item_container: {
    paddingRight: 25,
  },
});

export default DailyAssignmentsListItem;
