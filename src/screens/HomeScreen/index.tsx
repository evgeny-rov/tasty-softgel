import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';
import DailyAssignments from './components/DailyAssignments';
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
        <DailyAssignments />
      </ScrollView>
      <FloatingActionButton onPress={() => openNewMedicineModal(navigation)} />
    </>
  );
};

export default HomeScreen;
