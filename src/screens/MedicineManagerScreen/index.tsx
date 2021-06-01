import React from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';

import {theme, typography} from '@styles/';
import MedicineList from './MedicineList';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import {useDispatch} from 'react-redux';
import {showModalMedicine} from 'src/redux/entities/modal_medicine/modal_medicine.actions';

const MedicineManagerScreen = () => {
  const dispatch = useDispatch();

  const showModal = () => dispatch(showModalMedicine());

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* <BgImage source={require('../../assets/images/bg_02.jpg')} /> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.styles.h1}>Ваши лекарства</Text>
          <IconButton onPress={showModal}>
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
