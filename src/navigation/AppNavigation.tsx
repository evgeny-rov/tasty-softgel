import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import HomeScreen from '../screens/HomeScreen';
import MedicinesScreen from '../screens/MedicinesScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import Icon from '@components/Icon';
import {theme} from 'src/styles';

type Route = {
  key: 'home' | 'medicine_manager' | 'medicine_assignments';
  icon: React.ComponentProps<typeof Icon>['name'];
};

export type jumpTo = (key: Route['key']) => void;

export type ScreenProps = {jumpTo: jumpTo};

const routes: Route[] = [
  {key: 'home', icon: 'home'},
  {key: 'medicine_manager', icon: 'pills'},
  {
    key: 'medicine_assignments',
    icon: 'assignment',
  },
];

const renderScene = ({route, jumpTo}: {route: Route; jumpTo: jumpTo}) => {
  switch (route.key) {
    case 'home':
      return <HomeScreen jumpTo={jumpTo} />;
    case 'medicine_manager':
      return <MedicinesScreen jumpTo={jumpTo} />;
    case 'medicine_assignments':
      return <AssignmentsScreen jumpTo={jumpTo} />;
    default:
      return null;
  }
};

const renderIcon = ({route, color}: {route: Route; color: string}) => {
  return <Icon name={route.icon} color={color} />;
};

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
