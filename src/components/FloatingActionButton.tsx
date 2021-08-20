import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import Icon from './Icon';
import {theme} from '@styles/';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  return (
    <Pressable
      style={styles.floatingActionBtn}
      android_ripple={theme.configs.ripple_contained}
      onPress={onPress}>
      <Icon name="pills" color="#000" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingActionBtn: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 80,
    width: 50,
    borderRadius: 100,
  },
});

export default FloatingActionButton;
