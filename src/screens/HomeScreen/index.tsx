import React, {useEffect, useState} from 'react';
import {StatusBar, ScrollView, InteractionManager} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';
import DailyAssignments from './components/DailyAssignments';
import {openMedicineModal} from '../../navigation/helpers';

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
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
        <BgImage source={require('../../assets/images/bg_01.jpg')} />
        <ScrollView>
          <DailyAssignments />
        </ScrollView>
        <FloatingActionButton
          onPress={() => openMedicineModal(navigation, 'new')}
        />
      </>
    );
  } else {
    return null;
  }
};

export default HomeScreen;
