import React from 'react';
import {ScrollView, View} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import DailyAssignments from './components/DailyAssignments';
import useModalMedicine from 'src/hooks/useModalMedicine';
import {SceneRendererProps} from 'react-native-tab-view';
import EmptyState from '@components/EmptyState';
import {useSelector} from 'react-redux';
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
