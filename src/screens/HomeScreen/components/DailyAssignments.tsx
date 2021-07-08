import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {updateHour} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import {getCurrentHour} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import {getDailyAssignments} from 'src/redux/entities/assignments/assignments.selectors';
import DailyAssignmentsListItem from './DailyAssignmentsListItem';
import {typography} from 'src/styles';

const DailyAssignments = () => {
  const dispatch = useDispatch();
  const assignments = useSelector(getDailyAssignments);
  const currentHour = useSelector(getCurrentHour);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = new Date().getHours();
      const hourShouldUpdate = currentHour !== currentSystemHour;
      hourShouldUpdate && dispatch(updateHour());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentHour]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingTop: StatusBar.currentHeight,
    paddingVertical: 20,
    borderBottomRightRadius: 30,
  },
  header: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
});

export default DailyAssignments;
