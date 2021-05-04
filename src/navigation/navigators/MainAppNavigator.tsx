import React from 'react';
import createCustomStackNavigator from '../StackNavigatorConstructor';
import BottomTabBar from '@components/BottomTabBar';
import HomeScreen from '../../screens/HomeScreen';
import MedicineManagerScreen from '../../screens/MedicineManagerScreen';
import AssignmentsScreen from '../../screens/AssignmentsScreen';
import routes from '../routes';
import {CardStyleInterpolators} from '@react-navigation/stack';

const Stack = createCustomStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
      initialRouteName={routes.home}
      detachInactiveScreens={false}
      renderTabBar={(navigation, state) => (
        <BottomTabBar navigation={navigation} state={state} />
      )}>
      <Stack.Screen name={routes.home} component={HomeScreen} />
      <Stack.Screen
        name={routes.medicine_manager}
        component={MedicineManagerScreen}
      />
      <Stack.Screen
        name={routes.medicine_assignments}
        component={AssignmentsScreen}
      />
    </Stack.Navigator>
  );
};
