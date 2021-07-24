import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonIconFontConfig from '../configs/icomoonIconFontConfig.json';
import {theme} from 'src/styles';

const Icon = createIconSetFromIcoMoon(icomoonIconFontConfig);

type iconNames =
  | 'pills'
  | 'error'
  | 'add'
  | 'clear'
  | 'alarm'
  | 'arrow_down'
  | 'arrow_left'
  | 'arrow_right'
  | 'arrow_up'
  | 'bell_active'
  | 'bell_inactive'
  | 'assignment'
  | 'done'
  | 'home';

type Props = {
  name: iconNames;
  color?: string;
  size?: number;
};

export default ({size, ...props}: Props) => {
  return <Icon {...props} size={size ? size : theme.icon_size} />;
};
