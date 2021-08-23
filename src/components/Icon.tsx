import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonIconFontConfig from '../configs/icomoonIconFontConfig.json';
import {theme} from 'src/styles';

const FontIcon = createIconSetFromIcoMoon(icomoonIconFontConfig);

type iconNames = typeof icomoonIconFontConfig.icons[number]['properties']['name'];

type Props = {
  name: iconNames;
  color?: string;
  size?: number;
};

const Icon = ({size, ...props}: Props) => {
  return <FontIcon {...props} size={size ? size : theme.icon_size} />;
};

export default React.memo(Icon);
