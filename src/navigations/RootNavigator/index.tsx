import React from 'react';
import createCustomStackNavigator from '../CustomStackNavigator';
import {CardStyleInterpolators} from '@react-navigation/stack';
import routes from '../routes';
import MainAppNavigator from '../MainAppNavigator';
import MedicineModalScreen from '../../screens/MedicineModalScreen';

const Stack = createCustomStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName={routes.main}>
      <Stack.Screen name={routes.main} component={MainAppNavigator} />
      <Stack.Screen
        name={routes.medicine_modal}
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
