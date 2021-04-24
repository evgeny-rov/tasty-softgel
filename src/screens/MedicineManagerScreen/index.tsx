import React from 'react';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import SizedBox from '../../components/SizedBox';
import BgImage from '../../components/BgImage';

import {common, typography} from '@styles/';
import MedicineList from './MedicineList';

interface Props {
  navigation: StackNavigationHelpers;
}

const MedicineManagerScreen = ({navigation}: Props) => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg_02.jpg')} />
      <View style={common.styles.flex}>
        <View style={styles.container}>
          <Text style={typography.styles.h1}>Ваши лекарства</Text>
          <SizedBox height={40} />
          <MedicineList />
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
});

export default MedicineManagerScreen;
