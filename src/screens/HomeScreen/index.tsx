import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';
import DailyConsumptionList from './components/DailyConsumptionList';
import {openNewMedicineModal} from '../../navigation/helpers';

interface Props {
  navigation: StackNavigationHelpers;
}

const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg_01.jpg')} />
      <ScrollView>
        <DailyConsumptionList />
      </ScrollView>
      <FloatingActionButton onPress={() => openNewMedicineModal(navigation)} />
    </>
  );
};

export default HomeScreen;
