import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from 'src/hooks/reduxHooks';

import {getDailyPlanHourIds} from 'src/redux/slices/scheduled_medications/selectors';
import DailyScheduleItem from './DailyPlanItem';

const DailyPlan = () => {
  const dailyPlanHourIds = useAppSelector(getDailyPlanHourIds, shallowEqual);

  return (
    <FlatList
      data={dailyPlanHourIds}
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

export default DailyPlan;
