import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import hexToRgb from '@utils/hexToRgb';
import Icon from './Icon';
import {theme} from '@styles/';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

const FloatingActionButton = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.inner}
        android_ripple={{color: theme.colors.primary}}
        onPress={onPress}>
        <Icon name="pills" color={theme.colors.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'hidden',
    bottom: 30,
    right: 30,
    height: 80,
    width: 45,
    backgroundColor: hexToRgb(theme.colors.accent, 0.8),
    borderRadius: 50,
  },
  inner: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingActionButton;
