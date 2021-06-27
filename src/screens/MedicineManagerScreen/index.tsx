import React from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';

import useModalMedicine from 'src/hooks/useModalMedicine';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import MedicineList from './MedicineList';
import {theme, typography} from '@styles/';

const MedicineManagerScreen = () => {
  const {showModalNewMedicine} = useModalMedicine();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.styles.h1}>Ваши лекарства</Text>
          <IconButton onPress={showModalNewMedicine}>
            <Icon name="pills" size={20} color={theme.colors.primary} />
          </IconButton>
        </View>
        <MedicineList />
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default MedicineManagerScreen;
