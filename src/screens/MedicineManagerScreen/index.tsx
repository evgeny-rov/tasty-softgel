import React from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import SizedBox from '../../components/SizedBox';
import BgImage from '../../components/BgImage';

import {typography} from '@styles/';
import MedicineList from './MedicineList';

const MedicineManagerScreen = () => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg_02.jpg')} />
      <View style={styles.container}>
        <Text style={typography.styles.h1}>Ваши лекарства</Text>
        <SizedBox height={40} />
        <MedicineList />
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
});

export default MedicineManagerScreen;
