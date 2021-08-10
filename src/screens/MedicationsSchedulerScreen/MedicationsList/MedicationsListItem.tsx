import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import Icon from '@components/Icon';
import {common, theme, typography} from '@styles/';
import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import {getMedicationsSchedule} from 'src/redux/slices/scheduled_medications/selectors';
import {toggleScheduledDailyMedicationStatus} from 'src/redux/slices/scheduled_medications/actions';
import {Medication} from 'src/types';

interface Props extends Medication {
  selectedHourId: number;
}

const MedicationsListItem = ({id, name, quantity, selectedHourId}: Props) => {
  const dispatch = useAppDispatch();

  const scheduledHourIds = useAppSelector(getMedicationsSchedule)
    .byMedicationId[id];
  const isScheduledToSelectedHourId = scheduledHourIds?.includes(
    selectedHourId,
  );

  const toggleScheduledStatus = () =>
    dispatch(
      toggleScheduledDailyMedicationStatus({
        medicationId: id,
        hourId: selectedHourId,
        toRemove: isScheduledToSelectedHourId,
      }),
    );

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
          name={isScheduledToSelectedHourId ? 'bell_active' : 'bell_inactive'}
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
