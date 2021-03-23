import React, {ReactNode} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {theme} from '@styles/';

interface Props {
  action: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const IconButton = ({action, children, style = {}}: Props) => {
  return (
    <Pressable
      style={style}
      delayLongPress={400}
      android_ripple={theme.configs.ripple_sm}
      hitSlop={20}
      onPress={action}>
      {children ?? children}
    </Pressable>
  );
};

export default IconButton;
