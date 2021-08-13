import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import HomeScreen from '../screens/HomeScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import MedicationsSchedulerScreen from '../screens/MedicationsSchedulerScreen';
import Icon from '@components/Icon';
import {theme} from 'src/styles';

type Route = {
  key: 'home' | 'medications' | 'medications_scheduler';
  icon: React.ComponentProps<typeof Icon>['name'];
};

export type jumpTo = (key: Route['key']) => void;

export type ScreenProps = {jumpTo: jumpTo};

const routes: Route[] = [
  {key: 'home', icon: 'home'},
  {key: 'medications', icon: 'pills'},
  {
    key: 'medications_scheduler',
    icon: 'assignment',
  },
];

const renderScene = ({route, jumpTo}: {route: Route; jumpTo: jumpTo}) => {
  switch (route.key) {
    case 'home':
      return <HomeScreen jumpTo={jumpTo} />;
    case 'medications':
      return <MedicationsScreen jumpTo={jumpTo} />;
    case 'medications_scheduler':
      return <MedicationsSchedulerScreen jumpTo={jumpTo} />;
    default:
      return null;
  }
};

const renderIcon = ({route, color}: {route: Route; color: string}) => {
  return <Icon name={route.icon} color={color} />;
};

const TabBarItem = (props) => {
  console.log(props)
  return <View></View>;
}

const renderTabBar = (
  props: SceneRendererProps & {navigationState: NavigationState<Route>},
) => {
  return (
    <TabBar
      {...props}
      pressColor={theme.colors.accent}
      renderLabel={() => null}
      renderIndicator={() => null}
      activeColor={theme.colors.accent}
      inactiveColor={theme.colors.primary}
      
      renderIcon={renderIcon}
      contentContainerStyle={styles.tabbar_content_container}
      style={styles.tabbar}
    />
  );
};

const AppNavigation = () => {
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      tabBarPosition="bottom"
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {
    height: 40,
    backgroundColor: '#000',
  },
  tabbar_content_container: {
    alignItems: 'center',
  },
});

export default AppNavigation;
