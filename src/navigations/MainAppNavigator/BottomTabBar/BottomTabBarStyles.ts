import {PressableAndroidRippleConfig, StyleSheet} from 'react-native';

export const androidRipple: PressableAndroidRippleConfig = {
  borderless: true,
  color: '#574574',
  radius: 50,
};

export default StyleSheet.create({
  tabbar: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#000',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
