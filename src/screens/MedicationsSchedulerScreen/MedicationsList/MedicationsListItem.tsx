import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {shallowEqual} from 'react-redux';

import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import {getScheduledEntry} from 'src/redux/slices/scheduled_medications/selectors';
import {getMedicationById} from 'src/redux/slices/medications/selectors';
import {
  addScheduledDailyMedication,
  removeScheduledDailyMedication,
} from 'src/redux/slices/scheduled_medications/actions';
import Icon from '@components/Icon';
import {common, theme, typography} from '@styles/';

interface Props {
  id: string;
  selectedHourId: number;
}

const MedicationsListItem = ({id, selectedHourId}: Props) => {
  const dispatch = useAppDispatch();
  const {name, quantity} = useAppSelector(getMedicationById(id));

  const scheduledEntry = useAppSelector(
    getScheduledEntry(id, selectedHourId),
    shallowEqual,
  );

  const toggleScheduledStatus = () => {
    if (scheduledEntry === undefined) {
      dispatch(
        addScheduledDailyMedication({medicationId: id, hourId: selectedHourId}),
      );
    } else {
      dispatch(removeScheduledDailyMedication({id: scheduledEntry.id}));
    }
  };

  return (
    <View style={styles.container}>
      <View style={common.styles.col}>
        <Text style={typography.styles.body_bold}>{name}</Text>
        <Text style={typography.styles.body_sub_gray}>{quantity} шт.</Text>
      </View>
      <Pressable
        android_ripple={theme.configs.ripple_sm}
        hitSlop={15}
        onPress={toggleScheduledStatus}>
        <Icon
          name={scheduledEntry !== undefined ? 'bell_active' : 'bell_inactive'}
          color={theme.colors.primary}
          size={20}
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

export default React.memo(MedicationsListItem);
