import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from 'src/hooks/reduxHooks';

import {getMedicationsSchedule} from 'src/redux/slices/scheduled_medications/selectors';
import DailyScheduleItem from './DailyScheduleItem';

const DailySchedule = () => {
  const dailyScheduledHours = useAppSelector(
    (state) => getMedicationsSchedule(state).allHoursIds,
    shallowEqual,
  );

  return (
    <FlatList
      data={dailyScheduledHours}
      contentContainerStyle={styles.container}
      renderItem={({item: hourId}) => (
        <DailyScheduleItem hourId={Number(hourId)} />
      )}
      keyExtractor={(hourId) => hourId}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default DailySchedule;
