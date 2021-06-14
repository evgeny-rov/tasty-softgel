import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import DailyAssignments from './components/DailyAssignments';
import useModalMedicine from 'src/hooks/useModalMedicine';

const HomeScreen = () => {
  const {showModalNewMedicine} = useModalMedicine();

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ScrollView>
        <DailyAssignments />
      </ScrollView>
      <FloatingActionButton onPress={showModalNewMedicine} />
    </>
  );
};

export default HomeScreen;
