import {NavigationContainerRef} from '@react-navigation/native';
import React, {RefObject, useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';
import routes from '../../routes';

import styles from './styles';

interface Props {
  notificationService?: any;
  navigatorRef: RefObject<NavigationContainerRef>;
}

const BottomTabBar: React.FC<Props> = ({navigatorRef}) => {
  const [activeRoute, setActiveRoute] = useState('Home');
  const buttonRipple = {color: '#574574', radius: 50};

  const navigate = (routeName: string) => {
    navigatorRef.current?.navigate(routeName);
  };

  useEffect(() => {
    const subscription = navigatorRef.current?.addListener('state', () => {
      const currentRoute = navigatorRef.current?.getCurrentRoute();
      currentRoute && setActiveRoute(currentRoute.name);
    });
    return subscription;
  });

  return (
    <View style={styles.tabbar}>
      {routes.map((route) => (
        <Pressable
          key={route.name}
          style={styles.button}
          onPress={() => navigate(route.name)}
          android_ripple={buttonRipple}>
          <route.icon fill={activeRoute === route.name ? '#a187df' : 'grey'} />
        </Pressable>
      ))}
    </View>
  );
};

export default BottomTabBar;
