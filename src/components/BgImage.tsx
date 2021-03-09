import React from 'react';
import {Image, ImageProps} from 'react-native';
import {common} from '@styles/';

const BgImage = ({source}: ImageProps) => {
  return <Image style={common.styles.absolutely_full} source={source} />;
};

export default BgImage;
