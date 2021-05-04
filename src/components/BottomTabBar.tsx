import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {StackNavigationState, ParamListBase} from '@react-navigation/native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';

import routes from '../navigation/routes';
import {theme, common} from '@styles/';
import Icon from './Icon';

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
        <Icon name="home" color={getTabIconColor(routes.home)} size={20} />
      </Pressable>
      <Pressable
        style={common.styles.centered}
        onPress={() => navigation.navigate(routes.medicine_manager)}
        android_ripple={theme.configs.ripple_xl}>
        <Icon
          name="pills"
          color={getTabIconColor(routes.medicine_manager)}
          size={20}
        />
      </Pressable>
      <Pressable
        style={common.styles.centered}
        onPress={() => navigation.navigate(routes.medicine_assignments)}
        android_ripple={theme.configs.ripple_xl}>
        <Icon
          name="assignment"
          color={getTabIconColor(routes.medicine_assignments)}
          size={20}
        />
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
