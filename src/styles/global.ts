import {PressableAndroidRippleConfig, StyleSheet} from 'react-native';

export const androidRipple: PressableAndroidRippleConfig = {
  borderless: true,
  color: '#574574',
  radius: 30,
};

const globalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  h1: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
  },
  h2: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default globalStyles;
