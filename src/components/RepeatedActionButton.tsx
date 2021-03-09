import React, {useState, useEffect, ReactNode} from 'react';
import {Pressable} from 'react-native';
import {theme} from '@styles/';

interface Props {
  action: () => void;
  children?: ReactNode;
}

const RepeatingButton = ({action, children}: Props) => {
  const [pressedIn, setPressedIn] = useState(false);

  useEffect(() => {
    if (pressedIn) {
      requestAnimationFrame(action);
    }
  }, [pressedIn, action]);

  return (
    <Pressable
      delayLongPress={400}
      android_ripple={theme.configs.ripple_sm}
      hitSlop={20}
      onLongPress={() => setPressedIn(true)}
      onPressOut={() => setPressedIn(false)}
      onPress={action}>
      {children ?? children}
    </Pressable>
  );
};

export default RepeatingButton;
