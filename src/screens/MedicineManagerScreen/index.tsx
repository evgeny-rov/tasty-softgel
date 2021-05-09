import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import SizedBox from '../../components/SizedBox';
import BgImage from '../../components/BgImage';

import {typography} from '@styles/';
import MedicineList from './MedicineList';

const MedicineManagerScreen = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);

  if (isReady) {
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
  } else {
    return null;
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 20,
    backgroundColor: 'transparent'
  },
});

export default MedicineManagerScreen;
