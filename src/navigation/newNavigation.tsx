import React, {useRef, useState, useCallback} from 'react';
import PagerView from 'react-native-pager-view';

import HomeScreen from '../screens/HomeScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import MedicationsSchedulerScreen from '../screens/MedicationsSchedulerScreen';
import Icon from '@components/Icon';
import {theme} from 'src/styles';
import {Pressable, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const collapse = {
  from: {
    width: 30,
  },
  to: {
    width: 10,
  },
};

const expand = {
  from: {
    width: 10,
  },
  to: {
    width: 30,
  },
};

const TabBarItem = React.memo(
  ({
    iconName,
    focused,
    setPage,
    id,
  }: {
    iconName: React.ComponentProps<typeof Icon>['name'];
    focused: boolean;
    setPage: (index: number) => void;
    id: number;
  }) => {
    return (
      <Animatable.View
        animation={focused ? expand : collapse}
        duration={300}
        style={{
          marginHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: 5,
          height: 5,
          overflow: 'hidden',
          borderRadius: 100,
        }}>
        {/* <Icon
          name={iconName}
          color={focused ? theme.colors.accent : theme.colors.primary}
        /> */}
      </Animatable.View>
    );
  },
);

const TabBarItem2 = React.memo(
  ({
    iconName,
    focused,
    setPage,
    id,
  }: {
    iconName: React.ComponentProps<typeof Icon>['name'];
    focused: boolean;
    setPage: (index: number) => void;
    id: number;
  }) => {
    return (
      <Animatable.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={iconName}
          color={focused ? theme.colors.accent : theme.colors.primary}
        />
      </Animatable.View>
    );
  },
);

const TabBar = React.memo(
  ({
    pageIndex,
    setPage,
  }: {
    pageIndex: number;
    setPage: (index: number) => void;
  }) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'transparent',
          height: 20,
          width: '100%',
          opacity: 0.7,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TabBarItem
          iconName={'home'}
          focused={pageIndex === 0}
          id={0}
          setPage={setPage}
        />
        <TabBarItem
          iconName={'pills'}
          focused={pageIndex === 1}
          id={1}
          setPage={setPage}
        />
        <TabBarItem
          iconName={'assignment'}
          focused={pageIndex === 2}
          id={2}
          setPage={setPage}
        />
      </View>
    );
  },
);

const TabBar2 = React.memo(
  ({
    pageIndex,
    setPage,
  }: {
    pageIndex: number;
    setPage: (index: number) => void;
  }) => {
    return (
      <View
        style={{
          backgroundColor: 'black',
          height: 40,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TabBarItem2
          iconName={'home'}
          focused={pageIndex === 0}
          id={0}
          setPage={setPage}
        />
        <TabBarItem2
          iconName={'pills'}
          focused={pageIndex === 1}
          id={1}
          setPage={setPage}
        />
        <TabBarItem2
          iconName={'assignment'}
          focused={pageIndex === 2}
          id={2}
          setPage={setPage}
        />
      </View>
    );
  },
);

const Pager = React.memo(
  ({setter, refferer}: {setter: (page: number) => void; refferer: any}) => {
    return (
      <PagerView
        initialPage={0}
        ref={refferer}
        onPageSelected={(e) => setter(e.nativeEvent.position)}
        style={{flex: 1}}>
        <View key={0}>
          <HomeScreen jumpTo={() => null} />
        </View>
        <View key={1}>
          <MedicationsScreen jumpTo={() => null} />
        </View>
        <View key={2}>
          <MedicationsSchedulerScreen jumpTo={() => null} />
        </View>
      </PagerView>
    );
  },
);

const AppNavigation = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef(null);

  const setPage = useCallback((index: number) => {
    pagerRef.current.setPage(index);
  }, []);

  return (
    <>
      <Pager setter={setPageIndex} refferer={pagerRef} />
      <TabBar pageIndex={pageIndex} setPage={setPage} />
    </>
  );
};

export default AppNavigation;
