import React from 'react';
import {Text, View} from 'react-native';

import useMedicationModal from 'src/hooks/useMedicationModal';
import MedicationsList from './MedicationsList';
import EmptyState from '@components/EmptyState';
import {common, theme, typography} from '@styles/';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';

const MedicationsScreen = () => {
  const {showNewMedicationModal} = useMedicationModal();
  const isInEmptyState = false;

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
