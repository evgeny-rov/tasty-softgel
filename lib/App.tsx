import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {View, StatusBar, StyleSheet} from 'react-native';

import NotificationService from './services/NotificationService';

import BottomTabBar from './components/BottomTabBar';
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';

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
        <Stack.Navigator headerMode="none" initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
          <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomTabBar notificationService={notify} navigator={navigationRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
