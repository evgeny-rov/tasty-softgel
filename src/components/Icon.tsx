import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonIconFontConfig from '../configs/icomoonIconFontConfig.json';
import {theme} from 'src/styles';

const IconSet = createIconSetFromIcoMoon(icomoonIconFontConfig);

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

const Icon = ({size, ...props}: Props) => {
  return <IconSet {...props} size={size ? size : theme.icon_size} />;
};

export default React.memo(Icon);
