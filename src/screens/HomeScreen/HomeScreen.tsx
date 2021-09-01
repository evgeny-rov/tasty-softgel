import React from 'react';
import {View} from 'react-native';

import {useAppSelector} from 'src/hooks/reduxHooks';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {getIsScheduleInEmptyState} from 'src/redux/slices/scheduled_medications/selectors';
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
      </View>
    );
  } else {
    return (
      <EmptyState
        heading={'Здесь совсем пусто...'}
        message={'Ежедневный план появится когда вы добавите лекарства и назначите часы приема.'}
        action={{
          content: 'Добавить лекарство',
          onPress: () => {
            switchScreen('medications_scheduler');
            showNewMedicationModal();
          },
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
