import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';

import useModalMedicine from 'src/hooks/useModalMedicine';
import DailyAssignmentsList from './DailyAssignments/';
import FloatingActionButton from '@components/FloatingActionButton';
import EmptyState from '@components/EmptyState';
import {AppStateType} from 'src/types';
import {ScreenProps} from 'src/navigation/AppNavigation';
import {common, typography} from 'src/styles';

const HomeScreen = ({jumpTo}: ScreenProps) => {
  const {showModalNewMedicine} = useModalMedicine();
  const isInEmptyState =
    useSelector((state: AppStateType) => Object.keys(state.assignments.byId))
      .length === 0;

  if (!isInEmptyState) {
    return (
      <View style={common.styles.screen_container}>
        <ScrollView>
          <View style={common.styles.header}>
            <Text style={typography.styles.h1}>Ежедневный план</Text>
          </View>
          <DailyAssignmentsList />
        </ScrollView>
        <FloatingActionButton onPress={showModalNewMedicine} />
      </View>
    );
  } else {
    return (
      <EmptyState
        heading={'Здесь совсем пусто...'}
        message={'Добавьте новые лекарства и назначьте время приема.'}
        action={{
          content: 'Добавить лекарство',
          onPress: showModalNewMedicine,
        }}
        secondaryAction={{
          content: 'Назначить прием',
          onPress: () => jumpTo('medicine_assignments'),
        }}
      />
    );
  }
};

export default React.memo(HomeScreen);
