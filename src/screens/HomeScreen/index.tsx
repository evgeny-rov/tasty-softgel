import React from 'react';
import {ScrollView} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import DailyAssignments from './components/DailyAssignments';
import useModalMedicine from 'src/hooks/useModalMedicine';

const HomeScreen = () => {
  const {showModalNewMedicine} = useModalMedicine();

  return (
    <>
      <ScrollView>
        <DailyAssignments />
      </ScrollView>
      <FloatingActionButton onPress={showModalNewMedicine} />
    </>
  );
};

export default HomeScreen;
