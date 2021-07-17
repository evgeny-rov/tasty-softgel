import React from 'react';
import {ScrollView, View} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import DailyAssignments from './components/DailyAssignments';
import useModalMedicine from 'src/hooks/useModalMedicine';
import {SceneRendererProps} from 'react-native-tab-view';
import { common } from 'src/styles';

const HomeScreen = ({jumpTo}: SceneRendererProps) => {
  const {showModalNewMedicine} = useModalMedicine();

  return (
    <View style={common.styles.screen_container}>
      <ScrollView>
        <DailyAssignments jumpToScreen={jumpTo} />
      </ScrollView>
      <FloatingActionButton onPress={showModalNewMedicine} />
    </View>
  );
};

export default HomeScreen;
