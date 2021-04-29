import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {byHourMedicinesSelector} from 'src/redux/entities/assignments/assignments.selectors';
import {typography} from 'src/styles';
import SizedBox from '@components/SizedBox';
import DailyAssignmentsListItem from './DailyAssignmentsListItem';
import {updateHour} from 'src/redux/entities/consumptions/consumptions.actions';
import {getCurrentHour} from 'src/redux/entities/consumptions/consumptions.selectors';

const DailyAssignments = () => {
  const dispatch = useDispatch();
  const assignments = useSelector(byHourMedicinesSelector);
  const currentHour = useSelector(getCurrentHour);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = new Date().getHours();

      currentHour !== currentSystemHour && dispatch(updateHour());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={typography.styles.h1}>Ежедневный план</Text>
      <SizedBox height={35} />
      <View>
        {assignments.map((assignmentData, idx) => (
          <DailyAssignmentsListItem key={idx} {...assignmentData} />
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingVertical: 50,
    paddingHorizontal: 25,
    borderBottomRightRadius: 70,
  },
};

export default DailyAssignments;
