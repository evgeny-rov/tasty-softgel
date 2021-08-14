import React from 'react';
import {Text, View} from 'react-native';

import useMedicationModal from 'src/hooks/useMedicationModal';
import DailyPlan from './DailyPlan';
import FloatingActionButton from '@components/FloatingActionButton';
import EmptyState from '@components/EmptyState';
import {common, typography} from 'src/styles';

// to-do: reimplement empty state

const HomeScreen = () => {
  const {showNewMedicationModal} = useMedicationModal();
  const isInEmptyState = false;

  if (!isInEmptyState) {
    return (
      <View style={common.styles.screen_container}>
        <View style={common.styles.header}>
          <Text style={typography.styles.h1}>Ежедневный план</Text>
        </View>
        <DailyPlan />
        <FloatingActionButton onPress={showNewMedicationModal} />
      </View>
    );
  } else {
    return (
      <EmptyState
        heading={'Здесь совсем пусто...'}
        message={'Добавьте новые лекарства и запланируйте время приема.'}
        action={{
          content: 'Добавить лекарство',
          onPress: showNewMedicationModal,
        }}
        secondaryAction={{
          content: 'Запланировать прием',
          onPress: () => null,
        }}
      />
    );
  }
};

export default HomeScreen;
