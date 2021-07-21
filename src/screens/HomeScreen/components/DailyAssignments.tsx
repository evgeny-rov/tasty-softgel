import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {dailyAssignmentsRefresh} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import {getCurrentHour} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import {getDailyAssignments} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import DailyAssignmentsListItem from './DailyAssignmentsListItem';
import {common, typography} from 'src/styles';

const DailyAssignments = () => {
  const dispatch = useDispatch();
  const assignments = useSelector(getDailyAssignments);
  const currentHour = useSelector(getCurrentHour);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = new Date().getHours();
      const hourShouldUpdate = currentHour !== currentSystemHour;
      hourShouldUpdate && dispatch(dailyAssignmentsRefresh());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentHour]);

  return (
    <View style={styles.wrapper}>
      <View style={common.styles.header}>
        <Text style={typography.styles.h1}>Ежедневный план</Text>
      </View>
      <View>
        {assignments.map((assignmentData, idx) => (
          <DailyAssignmentsListItem key={idx} {...assignmentData} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#DDF3',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    paddingBottom: 30,
  },
});

export default DailyAssignments;
