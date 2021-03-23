import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';
import '../../services/notifications/NotificationManager';
import {openNewMedicineModal} from '../../navigation/helpers';
import DailyMedicinePlan from './DailyMedicinePlan';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  navigation: StackNavigationHelpers;
}

const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg2.png')} />
      <ScrollView>
        <DailyMedicinePlan />
      </ScrollView>
      <FloatingActionButton onPress={() => openNewMedicineModal(navigation)} />
    </>
  );
};

export default HomeScreen;
