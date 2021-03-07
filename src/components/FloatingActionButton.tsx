import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Pressable, StyleSheet} from 'react-native';
import {AddPillIcon} from '../Icons';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const styles = StyleSheet.create({
  floatingAction: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
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

const FloatingActionButton: React.FC<Props> = ({onPress}) => {
  return (
    <Pressable
      android_ripple={{color: 'rgba(0, 0, 0, 0.1)', radius: 30}}
      style={styles.floatingAction}
      onPress={onPress}>
      <AddPillIcon />
    </Pressable>
  );
};

export default FloatingActionButton;
