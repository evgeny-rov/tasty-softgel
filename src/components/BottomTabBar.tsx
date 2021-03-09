import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {StackNavigationState, ParamListBase} from '@react-navigation/native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';

import routes from '../navigations/routes';
import {ClipBoardListIcon, HomeIcon, PillListIcon} from '@icons/';
import {theme, common} from '@styles/';

interface Props {
  navigation: StackNavigationHelpers;
  state: StackNavigationState<ParamListBase>;
}

const BottomTabBar = ({navigation, state}: Props) => {
  const getTabIconColor = (tabName: string) => {
    return state.routes[state.index].name === tabName
      ? theme.colors.accent
      : theme.colors.secondary;
  };

  return (
    <View style={styles.tabbar}>
      <Pressable
        style={common.styles.centered}
        onPress={() => navigation.navigate(routes.home)}
        android_ripple={theme.configs.ripple_xl}>
        <HomeIcon fill={getTabIconColor(routes.home)} />
      </Pressable>
      <Pressable
        style={common.styles.centered}
        onPress={() => navigation.navigate(routes.medicine_manager)}
        android_ripple={theme.configs.ripple_xl}>
        <PillListIcon fill={getTabIconColor(routes.medicine_manager)} />
      </Pressable>
      <Pressable
        style={common.styles.centered}
        onPress={() => navigation.navigate(routes.reminders)}
        android_ripple={theme.configs.ripple_xl}>
        <ClipBoardListIcon fill={getTabIconColor(routes.reminders)} />
      </Pressable>
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

export default BottomTabBar;
