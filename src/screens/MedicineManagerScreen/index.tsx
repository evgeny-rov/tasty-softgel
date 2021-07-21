import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import {AppStateType} from 'src/types';
import EmptyState from '@components/EmptyState';
import useModalMedicine from 'src/hooks/useModalMedicine';
import MedicinesList from './MedicinesList';
import {common} from '@styles/';

const MedicineManagerScreen = () => {
  const {showModalNewMedicine} = useModalMedicine();
  const isInEmptyState =
    useSelector((state: AppStateType) => state.medicines.allIds).length === 0;

  if (!isInEmptyState) {
    return (
      <View style={common.styles.screen_container}>
        <MedicinesList />
      </View>
    );
  } else {
    return (
      <EmptyState
        heading={'Список лекарств пуст.'}
        message={'Ваши лекарства появятся после их добавления.'}
        action={{content: 'Добавить лекарство', onPress: showModalNewMedicine}}
      />
    );
  }
};

export default MedicineManagerScreen;
