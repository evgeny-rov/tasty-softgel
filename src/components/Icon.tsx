import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../configs/icomoonConfig.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

type iconNames =
  | 'pills'
  | 'error'
  | 'add'
  | 'clear'
  | 'keyboard_arrow_down'
  | 'keyboard_arrow_left'
  | 'keyboard_arrow_right'
  | 'keyboard_arrow_up'
  | 'notifications'
  | 'notifications_none'
  | 'assignment'
  | 'home'
  | 'quill';

type Props = {
  name: iconNames;
  color?: string;
  size?: number;
};

export default (props: Props) => {
  return <Icon {...props} />;
};
