import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Pressable, StyleSheet} from 'react-native';
import {AddPillIcon} from '../icons';
import {theme} from '@styles/';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  return (
    <Pressable
      android_ripple={theme.configs.ripple_contained}
      style={styles.floatingActionBtn}
      onPress={onPress}>
      <AddPillIcon />
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
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});

export default FloatingActionButton;
