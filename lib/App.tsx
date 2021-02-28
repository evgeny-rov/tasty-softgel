import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import routes from './routes';
import {store} from './redux';

import BottomTabBar from './components/BottomTabBar/BottomTabBar';

const Stack = createStackNavigator();
const navigationRef = React.createRef<NavigationContainerRef>();

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.wrapper}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator headerMode="none" initialRouteName={routes[0].name}>
            {routes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <BottomTabBar navigatorRef={navigationRef} />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
