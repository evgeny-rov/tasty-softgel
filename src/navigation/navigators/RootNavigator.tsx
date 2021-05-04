import React from 'react';
import createCustomStackNavigator from '../StackNavigatorConstructor';
import {CardStyleInterpolators} from '@react-navigation/stack';
import MainAppNavigator from './MainAppNavigator';
import routes from '../routes';
import ModalMedicineCardScreen from 'src/screens/ModalMedicineCardScreen';

const Stack = createCustomStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName={routes.main}>
      <Stack.Screen name={routes.main} component={MainAppNavigator} />
      <Stack.Screen
        name={routes.medicine_modal_card}
        component={ModalMedicineCardScreen}
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
