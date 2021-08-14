import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {shallowEqual} from 'react-redux';
import {HOURS_AS_TIME_STRING} from 'src/constants';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getScheduledHourIdsByMedicationId} from 'src/redux/slices/scheduled_medications/selectors';
import SizedBox from '@components/SizedBox';
import {typography, common} from 'src/styles';

const ListSeparator = () => <SizedBox width={5} />;
const EmptyListPlaceholder = () => (
  <Text style={typography.styles.body_sub_gray}>Прием не назначен</Text>
);

const ScheduledHourIdsItem = React.memo(({hourId}: {hourId: number}) => {
  return (
    <>
      <Text style={typography.styles.body_sub_gray}>
        {HOURS_AS_TIME_STRING[hourId]}
      </Text>
      <ListSeparator />
    </>
  );
});

const ScheduledHourIdsList = React.memo(
  ({medicationId}: {medicationId: string}) => {
    const scheduledHourIds = useAppSelector(
      getScheduledHourIdsByMedicationId(medicationId),
      shallowEqual,
    );

    const items = scheduledHourIds.map((hourId) => (
      <ScheduledHourIdsItem key={hourId} hourId={Number(hourId)} />
    ));

    return (
      <View style={styles.scheduled_items_container}>
        {scheduledHourIds.length > 0 ? items : <EmptyListPlaceholder />}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  scheduled_items_container: {
    ...common.styles.row,
    flexWrap: 'wrap',
  },
});

export default ScheduledHourIdsList;
