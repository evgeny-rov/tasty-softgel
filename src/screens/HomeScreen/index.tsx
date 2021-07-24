import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import {SceneRendererProps} from 'react-native-tab-view';

import useModalMedicine from 'src/hooks/useModalMedicine';
import DailyAssignments from './components/DailyAssignments';
import FloatingActionButton from '@components/FloatingActionButton';
import EmptyState from '@components/EmptyState';
import {AppStateType} from 'src/types';

const HomeScreen = ({jumpTo}: SceneRendererProps) => {
  const {showModalNewMedicine} = useModalMedicine();
  const isInEmptyState =
    useSelector((state: AppStateType) => Object.keys(state.assignments.byId))
      .length === 0;

  if (!isInEmptyState) {
    return (
      <>
        <ScrollView>
          <DailyAssignments />
        </ScrollView>
        <FloatingActionButton onPress={showModalNewMedicine} />
      </>
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

export default HomeScreen;
