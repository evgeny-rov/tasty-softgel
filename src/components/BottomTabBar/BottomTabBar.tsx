import React from 'react';
import {View, Pressable} from 'react-native';
import {StackNavigationState, ParamListBase} from '@react-navigation/native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import routeConfig from '../../navigations/routeConfig';

import styles from './BottomTabBarStyles';
import {androidRipple} from '../../styles/global';

export type Props = {
  navigation: StackNavigationHelpers;
  state: StackNavigationState<ParamListBase>;
};

const BottomTabBar = ({navigation, state}: Props) => {
  const {routeNames, routes} = routeConfig;

  return (
    <View style={styles.tabbar}>
      {routeNames.map((routeName, idx) => {
        const {TabIcon} = routes[routeName];

        return (
          <Pressable
            key={routeName}
            style={styles.button}
            onPress={() => navigation.navigate(routeName)}
            android_ripple={androidRipple}>
            <TabIcon fill={state.index === idx ? '#b794d8' : 'grey'} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
