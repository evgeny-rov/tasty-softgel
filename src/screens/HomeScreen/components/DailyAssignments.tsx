import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {dailyAssignmentsRefresh} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import {getCurrentHour} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import {getDailyAssignments} from 'src/redux/entities/daily_assignments/daily_assignments.selectors';
import useModalMedicine from 'src/hooks/useModalMedicine';
import DailyAssignmentsListItem from './DailyAssignmentsListItem';
import EmptyState from '@components/EmptyState';
import {common, typography} from 'src/styles';

type Props = {
  jumpToScreen: (key: string) => void;
};

const DailyAssignments = ({jumpToScreen}: Props) => {
  const {showModalNewMedicine} = useModalMedicine();
  const dispatch = useDispatch();
  const assignments = useSelector(getDailyAssignments);
  const currentHour = useSelector(getCurrentHour);
  const isInEmptyState = assignments.length === 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = new Date().getHours();
      const hourShouldUpdate = currentHour !== currentSystemHour;
      hourShouldUpdate && dispatch(dailyAssignmentsRefresh());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentHour]);

  if (!isInEmptyState) {
    return (
      <>
        <View style={common.styles.header}>
          <Text style={typography.styles.h1}>Ежедневный план</Text>
        </View>
        <View>
          {assignments.map((assignmentData, idx) => (
            <DailyAssignmentsListItem key={idx} {...assignmentData} />
          ))}
        </View>
      </>
    );
  } else {
    return (
      <EmptyState
        heading={'Ежедневный план пуст.'}
        message={'Добавьте лекарства и назначьте время для приема'}
        actions={[
          {content: 'Добавить лекарство', onPress: showModalNewMedicine},
          {
            content: 'Назначить прием',
            onPress: () => jumpToScreen('medicine_assignments'),
          },
        ]}
      />
    );
  }
};

export default DailyAssignments;
