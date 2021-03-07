import React from 'react';
import {View, Pressable} from 'react-native';
import {StackNavigationState, ParamListBase} from '@react-navigation/native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';

import {ClipBoardListIcon, HomeIcon, PillListIcon} from '../../../Icons';
import styles, {androidRipple} from './BottomTabBarStyles';
import routes from '../../routes';

interface Props {
  navigation: StackNavigationHelpers;
  state: StackNavigationState<ParamListBase>;
}

const BottomTabBar = ({navigation, state}: Props) => {
  const getTabIconColor = (tabName: string) => {
    return state.routes[state.index].name === tabName ? '#b794d8' : 'grey';
  };

  return (
    <View style={styles.tabbar}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(routes.home)}
        android_ripple={androidRipple}>
        <HomeIcon fill={getTabIconColor(routes.home)} />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(routes.medicine_manager)}
        android_ripple={androidRipple}>
        <PillListIcon fill={getTabIconColor(routes.medicine_manager)} />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(routes.reminders)}
        android_ripple={androidRipple}>
        <ClipBoardListIcon fill={getTabIconColor(routes.reminders)} />
      </Pressable>
    </View>
  );
};

export default BottomTabBar;
