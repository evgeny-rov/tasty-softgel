import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import createMyStackNavigator from './myStackNavigator';
import routeConfig from './routeConfig';
import BottomTabBar from '../components/BottomTabBar/BottomTabBar';

const Stack = createMyStackNavigator();

const AppNavigator = () => {
  const {initialRouteName, routeNames, routes} = routeConfig;

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={initialRouteName}
        renderTabBar={(navigation, state) => (
          <BottomTabBar navigation={navigation} state={state} />
        )}>
        {routeNames.map((routeName) => (
          <Stack.Screen
            key={routeName}
            name={routeName}
            component={routes[routeName].screen}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
