import React from 'react';
import createCustomStackNavigator from '../StackNavigatorConstructor';
import {CardStyleInterpolators} from '@react-navigation/stack';
import MainAppNavigator from './MainAppNavigator';
import ModalNewMedicineScreen from '../../screens/ModalNewMedicineScreen';
import routes from '../routes';
import ModalEditMedicineScreen from 'src/screens/ModalEditMedicineScreen';

const Stack = createCustomStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName={routes.main}>
      <Stack.Screen name={routes.main} component={MainAppNavigator} />
      <Stack.Screen
        name={routes.modal_new_medicine}
        component={ModalNewMedicineScreen}
        options={{
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={routes.modal_medicine_card}
        component={ModalEditMedicineScreen}
        options={{
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
};
