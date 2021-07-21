import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import HomeScreen from '../screens/HomeScreen';
import MedicineManagerScreen from '../screens/MedicineManagerScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import Icon from '@components/Icon';
import {theme} from 'src/styles';

type Route = {
  key: string;
  icon: React.ComponentProps<typeof Icon>['name'];
};

type State = NavigationState<Route>;

const initialNavigationState: State = {
  index: 0,
  routes: [
    {key: 'home', icon: 'home'},
    {key: 'medicine_manager', icon: 'pills'},
    {
      key: 'medicine_assignments',
      icon: 'assignment',
    },
  ],
};

const renderScene = SceneMap({
  home: HomeScreen,
  medicine_manager: MedicineManagerScreen,
  medicine_assignments: AssignmentsScreen,
});

export default () => {
  const [state, setState] = useState<State>(initialNavigationState);

  const handleIndexChange = (index: number) => {
    setState({...state, index});
  };

  const renderIcon = ({route, focused}: {route: Route; focused: boolean}) => (
    <Icon
      name={route.icon}
      color={focused ? theme.colors.accent : theme.colors.secondary}
    />
  );

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      pressColor={theme.colors.accent}
      renderLabel={() => null}
      renderIndicator={() => null}
      contentContainerStyle={styles.tabbar_content_container}
      style={styles.tabbar}
      renderIcon={renderIcon}
    />
  );

  return (
    <>
      <TabView
        lazyPreloadDistance={3}
        navigationState={state}
        onIndexChange={handleIndexChange}
        // lazy={false}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"></TabView>
    </>
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
