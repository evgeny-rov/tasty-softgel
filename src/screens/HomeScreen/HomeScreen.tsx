import React from 'react';
import {View} from 'react-native';

import {useAppSelector} from 'src/hooks/reduxHooks';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {getIsScheduleInEmptyState} from 'src/redux/slices/scheduled_medications/selectors';
import FloatingActionButton from '@components/FloatingActionButton';
import EmptyState from '@components/EmptyState';
import DailyPlan from './DailyPlan';
import Header from './Header';
import {common} from 'src/styles';

import type {ScreenProps} from 'src/navigation/AppNavigation';

const HomeScreen = ({switchScreen}: ScreenProps) => {
  const {showNewMedicationModal} = useMedicationModal();
  const isInEmptyState = useAppSelector(getIsScheduleInEmptyState);

  if (!isInEmptyState) {
    return (
      <View style={common.styles.screen_container}>
        <Header />
        <DailyPlan />
        <FloatingActionButton onPress={showNewMedicationModal} />
      </View>
    );
  } else {
    return (
      <EmptyState
        heading={'Здесь совсем пусто...'}
        message={'Добавьте новые лекарства и назначьте часы приема.'}
        action={{
          content: 'Добавить лекарство',
          onPress: showNewMedicationModal,
        }}
        secondaryAction={{
          content: 'Назачить часы приема',
          onPress: () => switchScreen('medications_scheduler'),
        }}
      />
    );
  }
};

export default HomeScreen;
