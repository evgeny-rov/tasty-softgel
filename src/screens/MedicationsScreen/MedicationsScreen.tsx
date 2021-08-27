import React from 'react';
import {View} from 'react-native';

import {useAppSelector} from 'src/hooks/reduxHooks';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {getIsMedicationsInEmptyState} from 'src/redux/slices/medications/selectors';
import EmptyState from '@components/EmptyState';
import Header from './Header';
import MedicationsList from './MedicationsList';
import {common} from '@styles/';

const MedicationsScreen = () => {
  const {showNewMedicationModal} = useMedicationModal();
  const isInEmptyState = useAppSelector(getIsMedicationsInEmptyState);

  if (!isInEmptyState) {
    return (
      <View style={common.styles.screen_container}>
        <Header />
        <MedicationsList />
      </View>
    );
  } else {
    return (
      <EmptyState
        heading={'Список лекарств пуст.'}
        message={'Ваши лекарства появятся после их добавления.'}
        action={{
          content: 'Добавить лекарство',
          onPress: showNewMedicationModal,
        }}
      />
    );
  }
};

export default MedicationsScreen;
