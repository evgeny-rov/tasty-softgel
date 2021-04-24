import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface SizedBoxProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const SizedBox: React.FC<SizedBoxProps> = ({
  width = 0,
  height = 0,
  style = {},
  children,
}) => {
  return <View style={[{width, height}, style]}>{children}</View>;
};

export default SizedBox;
