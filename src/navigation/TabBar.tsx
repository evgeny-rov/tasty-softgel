import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Icon from '@components/Icon';
import {common, theme} from 'src/styles';

const animations = {
  expand: {
    from: {
      transform: [{scale: 1}],
    },
    to: {
      transform: [{scale: 2}],
    },
  },
  collapse: {
    from: {
      transform: [{scale: 2}],
    },
    to: {
      transform: [{scale: 1}],
    },
  },
};

const TabBarItem = React.memo(
  ({
    iconName,
    focused,
  }: {
    iconName: React.ComponentProps<typeof Icon>['name'];
    focused: boolean;
  }) => {
    return (
      <Animatable.View
        useNativeDriver
        animation={focused ? animations.expand : animations.collapse}
        duration={300}
        style={styles.item}>
        <Icon name={iconName} color={theme.colors.primary} size={10} />
      </Animatable.View>
    );
  },
);

const TabBar = React.memo(({pageIndex}: {pageIndex: number}) => {
  return (
    <View style={styles.container}>
      <TabBarItem iconName={'home'} focused={pageIndex === 0} />
      <TabBarItem iconName={'pills'} focused={pageIndex === 1} />
      <TabBarItem iconName={'assignment'} focused={pageIndex === 2} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...common.styles.centered,
    opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    height: 30,
    width: '100%',
    flexDirection: 'row',
  },
  item: {
    marginHorizontal: 10,
  },
});

export default TabBar;
