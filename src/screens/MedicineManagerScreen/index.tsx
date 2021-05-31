import React from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import SizedBox from '../../components/SizedBox';
import BgImage from '../../components/BgImage';

import {typography} from '@styles/';
import MedicineList from './MedicineList';

const MedicineManagerScreen = () => {
  console.log('screen render');

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg_02.jpg')} />
      <View style={styles.container}>
        <View style={styles.title_wrapper}>
          <Text style={typography.styles.h1}>Ваши лекарства</Text>
        </View>
        <MedicineList />
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  title_wrapper: {
    padding: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default MedicineManagerScreen;
