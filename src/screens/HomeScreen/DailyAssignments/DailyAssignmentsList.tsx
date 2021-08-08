import {isEqual} from 'lodash';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {dailyAssignmentsRefresh} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import {getCurrentHour} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import {getDailyAssignments} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import DailyAssignmentsListItem from './DailyAssignmentsListItem';

const DailyAssignmentsList = () => {
  // const dispatch = useDispatch();
  const assignments = useSelector(getDailyAssignments);
  // const currentHour = useSelector(getCurrentHour);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const currentSystemHour = new Date().getHours();
  //     const hourShouldUpdate = currentHour !== currentSystemHour;
  //     hourShouldUpdate && dispatch(dailyAssignmentsRefresh());
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, [currentHour]);

  return (
    <View style={styles.container}>
      {assignments.map((assignmentData) => (
        <DailyAssignmentsListItem
          key={assignmentData.assignmentHour}
          {...assignmentData}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});

export default DailyAssignmentsList;
