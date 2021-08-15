import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import PagerView from 'react-native-pager-view';

import HomeScreen from '../screens/HomeScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import MedicationsSchedulerScreen from '../screens/MedicationsSchedulerScreen';
import TabBar from './TabBar';
import {common} from 'src/styles';

const routes = {home: 0, medications: 1, medications_scheduler: 2} as const;

export type ScreenProps = {
  switchScreen: (key: keyof typeof routes) => void;
};

const Pager = React.memo(
  ({setPageIndex}: {setPageIndex: (page: number) => void}) => {
    const pagerRef = useRef<PagerView>(null);

    const setPage: ScreenProps['switchScreen'] = (key) =>
      pagerRef.current?.setPage(routes[key]);

    return (
      <PagerView
        initialPage={routes.home}
        ref={pagerRef}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        style={common.styles.flex}>
        <View key={routes.home}>
          <HomeScreen switchScreen={setPage} />
        </View>
        <View key={routes.medications}>
          <MedicationsScreen />
        </View>
        <View key={routes.medications_scheduler}>
          <MedicationsSchedulerScreen />
        </View>
      </PagerView>
    );
  },
);

const AppNavigation = () => {
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <>
      <Pager setPageIndex={setPageIndex} />
      <TabBar pageIndex={pageIndex} />
    </>
  );
};

export default AppNavigation;
