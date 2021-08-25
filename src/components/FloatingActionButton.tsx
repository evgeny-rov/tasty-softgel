import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import hexToRgb from '@utils/hexToRgb';
import Icon from './Icon';
import {theme, common} from '@styles/';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

const FloatingActionButton = ({onPress}: Props) => {
  return (
    <LinearGradient
      colors={[
        hexToRgb(theme.colors.accent2, 0.4),
        hexToRgb(theme.colors.attention, 0.4),
      ]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <Pressable
        style={styles.inner}
        android_ripple={{color: theme.colors.primary}}
        onPress={onPress}>
        <Icon name="pills" color={theme.colors.primary} />
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'hidden',
    bottom: 40,
    right: 35,
    height: 80,
    width: 45,
    backgroundColor: hexToRgb(theme.colors.accent, 0.8),
    borderRadius: 50,
  },
  inner: {
    ...common.styles.flex,
    ...common.styles.centered,
    width: '100%',
    height: '100%',
  },
});

export default FloatingActionButton;
