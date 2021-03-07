import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import routes from '../../navigations/routes';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';

interface Props {
  navigation: StackNavigationHelpers;
}

const HomeScreen = ({navigation}: Props) => {
  const openMedicineModal = () => navigation.navigate(routes.medicine_modal);

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg2.png')} />
      <FloatingActionButton onPress={openMedicineModal} />
    </>
  );
};

export default HomeScreen;
