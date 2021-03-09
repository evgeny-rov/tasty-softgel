import React from 'react';
import createCustomStackNavigator from '@components/CustomStackNavigator';
import {CardStyleInterpolators} from '@react-navigation/stack';
import MainAppNavigator from './MainAppNavigator';
import MedicineModalScreen from '../screens/ModalNewMedicineScreen';
import routes from './routes';

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
        component={MedicineModalScreen}
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
