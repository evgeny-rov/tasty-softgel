import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {View, StatusBar, StyleSheet} from 'react-native';

import NotificationService from './services/NotificationService';

import BottomTabBar from './components/BottomTabBar';
import routes from './routes';

const onNotificationRegistration = (token: any) => console.log(token);
const onNotification = (notification: any) => console.log(notification);

const Stack = createStackNavigator();
const navigationRef = React.createRef<NavigationContainerRef>();
const notify = new NotificationService(
  onNotificationRegistration,
  onNotification,
);

const App = () => {
  return (
    <View style={styles.wrapper}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none" initialRouteName={routes[0].name}>
          {routes.map((route, idx) => (
            <Stack.Screen
              key={idx}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
      <BottomTabBar notificationService={notify} navigatorRef={navigationRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
