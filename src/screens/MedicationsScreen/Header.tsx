import React from 'react';
import {View, Text} from 'react-native';
import useMedicationModal from 'src/hooks/useMedicationModal';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import {common, typography, theme} from 'src/styles';

const Header = () => {
  const {showNewMedicationModal} = useMedicationModal();

  return (
    <View style={common.styles.header}>
      <Text style={typography.styles.h1}>Ваши лекарства</Text>
      <IconButton onPress={showNewMedicationModal}>
        <Icon name="pills" color={theme.colors.primary} />
      </IconButton>
    </View>
  );
};

export default Header;
