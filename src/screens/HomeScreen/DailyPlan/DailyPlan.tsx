import SizedBox from '@components/SizedBox';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from 'src/hooks/reduxHooks';

import {getDailyPlanHourIds} from 'src/redux/slices/scheduled_medications/selectors';
import DailyScheduleItem from './DailyPlanItem';

const ListSeparator = () => <SizedBox height={15} />;
const ListFooterComponent = () => <SizedBox height={150} />;

const DailyPlan = () => {
  const dailyPlanHourIds = useAppSelector(getDailyPlanHourIds, shallowEqual);

  return (
    <FlatList
      fadingEdgeLength={300}
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ListSeparator}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={styles.container}
      data={dailyPlanHourIds}
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
