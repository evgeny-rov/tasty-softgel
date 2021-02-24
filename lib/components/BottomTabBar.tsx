import {NavigationContainerRef} from '@react-navigation/native';
import React, {RefObject, useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {
  HomeIcon,
  ClipBoardListIcon,
  PillListIcon,
  ShoppingBagIcon,
} from './icons';

interface Props {
  notificationService: any;
  navigator: RefObject<NavigationContainerRef>;
}

const styles = StyleSheet.create({
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

const BottomTabBar: React.FC<Props> = ({navigator}) => {
  const [activeRoute, setActiveRoute] = useState('Home');
  const buttonRipple = {color: '#574574', radius: 50};

  const navigate = (routeName: string) => {
    navigator.current?.navigate(routeName);
  };

  const changeRoute = (routeName: string) => {
    navigate(routeName);
    setActiveRoute(routeName);
  };

  return (
    <View style={styles.tabbar}>
      <Pressable
        style={styles.button}
        onPress={() => changeRoute('Home')}
        android_ripple={buttonRipple}>
        <HomeIcon fill={activeRoute === 'Home' ? '#ff9494' : '#fff'} />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => changeRoute('SecondScreen')}
        android_ripple={buttonRipple}>
        <PillListIcon
          fill={activeRoute === 'SecondScreen' ? '#ff9494' : '#fff'}
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => changeRoute('ThirdScreen')}
        android_ripple={buttonRipple}>
        <ClipBoardListIcon
          fill={activeRoute === 'ThirdScreen' ? '#ff9494' : '#fff'}
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => changeRoute('ThirdScreen')}
        android_ripple={buttonRipple}>
        <ShoppingBagIcon
          fill={activeRoute === 'ThirdScreen' ? '#ff9494' : '#fff'}
        />
      </Pressable>
    </View>
  );
};

export default BottomTabBar;
