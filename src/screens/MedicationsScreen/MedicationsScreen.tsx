import React from 'react';
import {Text, View} from 'react-native';

import {useAppSelector} from 'src/hooks/reduxHooks';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {getIsMedicationsInEmptyState} from 'src/redux/slices/medications/selectors';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import EmptyState from '@components/EmptyState';
import MedicationsList from './MedicationsList';
import {common, theme, typography} from '@styles/';

const MedicationsScreen = () => {
  const {showNewMedicationModal} = useMedicationModal();
  const isInEmptyState = useAppSelector(getIsMedicationsInEmptyState);

  if (!isInEmptyState) {
    return (
      <View style={common.styles.screen_container}>
        <View style={common.styles.header}>
          <Text style={typography.styles.h1}>Ваши лекарства</Text>
          <IconButton onPress={showNewMedicationModal}>
            <Icon name="pills" color={theme.colors.primary} />
          </IconButton>
        </View>
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
