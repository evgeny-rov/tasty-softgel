import React, {useState} from 'react';
import createCustomStackNavigator from '../StackNavigatorConstructor';
import HomeScreen from '../../screens/HomeScreen';
import MedicineManagerScreen from '../../screens/MedicineManagerScreen';
import AssignmentsScreen from '../../screens/AssignmentsScreen';
import routes from '../routes';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {SceneMap, TabView} from 'react-native-tab-view';
import {Pressable, StyleSheet, View} from 'react-native';
import {common, theme} from 'src/styles';
import Icon from '@components/Icon';

interface TabProps {
  jumpTo: Function;
  navigationState: {
    index: number;
    routes: Array<{
      key: string;
      title: string;
    }>;
  };
}

const BottomTabBar = ({jumpTo, navigationState}: TabProps) => {
  const getTabIconColor = (tabIndex: number) => {
    console.log('getting color')
    return tabIndex === navigationState.index
      ? theme.colors.accent
      : theme.colors.secondary;
  };

  return (
    <View style={styles.tabbar}>
      {navigationState.routes.map((routeData, idx) => {
        return (
          <Pressable
            key={idx}
            style={common.styles.centered}
            onPress={() => jumpTo(routeData.key)}
            android_ripple={theme.configs.ripple_xl}>
            <Icon name="home" color={getTabIconColor(idx)} size={20} />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#000',
  },
});

const renderScene = SceneMap({
  home: HomeScreen,
  medicine_manager: MedicineManagerScreen,
  medicine_assignments: AssignmentsScreen,
});

export default () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'home', title: 'homescreen'},
    {key: 'medicine_manager', title: 'medicine manager'},
    {key: 'medicine_assignments', title: 'medicine assignments'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      lazy={false}
      renderScene={renderScene}
      renderTabBar={BottomTabBar}
      tabBarPosition="bottom"
    />
  );
};

// const Stack = createCustomStackNavigator();

// export default () => {
//   return (
//     <Stack.Navigator
//       headerMode="none"
//       screenOptions={{
//         cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
//       }}
//       initialRouteName={routes.home}
//       detachInactiveScreens={false}
//       renderTabBar={(navigation, state) => (
//         <BottomTabBar navigation={navigation} state={state} />
//       )}>
//       <Stack.Screen name={routes.home} component={HomeScreen} />
//       <Stack.Screen
//         name={routes.medicine_manager}
//         component={MedicineManagerScreen}
//       />
//       <Stack.Screen
//         name={routes.medicine_assignments}
//         component={AssignmentsScreen}
//       />
//     </Stack.Navigator>
//   );
// };
