import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {HOURS_AS_TIME_STRING} from '@constants/';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getMedicationsSchedule} from 'src/redux/slices/scheduled_medications/selectors';
import {theme, typography} from '@styles/';
import SizedBox from '@components/SizedBox';
import {Medication} from 'src/types';

const ScheduledHoursItem = React.memo(({hourId}: {hourId: number}) => {
  return (
    <>
      <Text>{HOURS_AS_TIME_STRING[hourId]}</Text>
      <SizedBox width={5} />
    </>
  );
});

const MedicationsListItem = ({id, name, quantity}: Medication) => {
  const {showUpdateMedicationModal} = useMedicationModal();
  const scheduledHourIds = useAppSelector(getMedicationsSchedule)
    .byMedicationId[id];

  const showModal = () => showUpdateMedicationModal({id, name, quantity});

  const getScheduledHourIds = () =>
    scheduledHourIds.map((hourId) => (
      <ScheduledHoursItem key={hourId} hourId={hourId} />
    ));

  return (
    <Pressable
      android_ripple={{color: theme.colors.accent}}
      style={styles.container}
      onPress={showModal}>
      <View>
        <Text style={typography.styles.body_bold} numberOfLines={1}>
          {name}
        </Text>
        <Text numberOfLines={1} style={typography.styles.body_sub_gray}>
          {scheduledHourIds ? getScheduledHourIds() : 'Прием не назначен'}
        </Text>
      </View>
      <View>
        <Text style={typography.styles.body_sm}>{quantity} шт.</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default React.memo(MedicationsListItem);
