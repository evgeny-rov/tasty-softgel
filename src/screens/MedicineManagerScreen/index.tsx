import React from 'react';
import {View, Text} from 'react-native';

import useModalMedicine from 'src/hooks/useModalMedicine';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import MedicineList from './MedicineList';
import {common, theme, typography} from '@styles/';

const MedicineManagerScreen = () => {
  const {showModalNewMedicine} = useModalMedicine();

  return (
    <>
      <View style={common.styles.screen_container}>
        <View style={common.styles.header}>
          <Text style={typography.styles.h1}>Ваши лекарства</Text>
          <IconButton onPress={showModalNewMedicine}>
            <Icon name="pills" color={theme.colors.primary} />
          </IconButton>
        </View>
        <MedicineList />
      </View>
    </>
  );
};

export default MedicineManagerScreen;
