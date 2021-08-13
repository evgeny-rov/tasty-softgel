import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {shallowEqual} from 'react-redux';

import {HOURS_AS_TIME_STRING} from '@constants/';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getMedicationsSchedule} from 'src/redux/slices/scheduled_medications/selectors';
import {common, theme, typography} from '@styles/';
import SizedBox from '@components/SizedBox';

const ListSeparator = () => <SizedBox width={5} />;

const ScheduledHoursItem = React.memo(({hourId}: {hourId: number}) => {
  return (
    <>
      <Text style={typography.styles.body_sub_gray}>
        {HOURS_AS_TIME_STRING[hourId]}
      </Text>
      <ListSeparator />
    </>
  );
});

const EmptyScheduledListPlaceholder = () => (
  <Text style={typography.styles.body_sub_gray}>Прием не назначен</Text>
);

const ScheduledHoursList = React.memo(
  ({medicationId}: {medicationId: string}) => {
    const scheduledHourIds = useAppSelector(
      (state) =>
        Object.keys(
          getMedicationsSchedule(state).byMedicationId[medicationId] ?? {},
        ),
      shallowEqual,
    );

    const items = scheduledHourIds.map((hourId) => (
      <ScheduledHoursItem key={hourId} hourId={Number(hourId)} />
    ));

    return (
      <View style={styles.scheduled_items_container}>
        {scheduledHourIds.length > 0 ? (
          items
        ) : (
          <EmptyScheduledListPlaceholder />
        )}
      </View>
    );
  },
);

const MedicationsListItem = ({id}: {id: string}) => {
  const {showUpdateMedicationModal} = useMedicationModal();
  const {name, quantity} = useAppSelector(
    (state) => state.medications.byId[id],
  );

  const showModal = () => showUpdateMedicationModal({id, name, quantity});

  return (
    <Pressable
      android_ripple={{color: theme.colors.accent}}
      style={styles.container}
      onPress={showModal}>
      <View style={common.styles.flex}>
        <Text style={typography.styles.body_bold} numberOfLines={1}>
          {name}
        </Text>
        <ScheduledHoursList medicationId={id} />
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
  scheduled_items_container: {
    ...common.styles.row,
    flexWrap: 'wrap',
  },
});

export default React.memo(MedicationsListItem);
