import React, {ReactNode} from 'react';
import {Pressable} from 'react-native';
import {theme} from 'src/styles';

type Props = {
  onPress: () => void;
  children: ReactNode;
};

const IconButton = ({onPress, children}: Props) => (
  <Pressable
    android_ripple={theme.configs.ripple_sm}
    onPress={onPress}
    hitSlop={25}>
    {children}
  </Pressable>
);

export default IconButton;
