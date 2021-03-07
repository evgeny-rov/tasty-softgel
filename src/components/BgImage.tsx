import React from 'react';
import {Image, StyleSheet, ImageProps} from 'react-native';

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default ({source}: ImageProps) => {
  return <Image style={styles.fullscreen} source={source} />;
};
