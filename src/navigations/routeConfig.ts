import HomeScreen from '../screens/HomeScreen';
import MedicineScreen from '../screens/MedicineScreen';
import RemindersScreen from '../screens/RemindersScreen';
import {ClipBoardListIcon, HomeIcon, PillListIcon} from '../components/icons';
import {FunctionComponent} from 'react';
import {SvgProps} from 'react-native-svg';

type RouteType = {
  [name: string]: {
    screen: FunctionComponent;
    TabIcon: (props: SvgProps) => JSX.Element;
  };
};

type RouteConfigType<T> = {
  routes: RouteType;
  initialRouteName: keyof T;
  routeNames: Array<keyof T>;
};

const routes = {
  home: {
    screen: HomeScreen,
    TabIcon: HomeIcon,
  },
  medicine: {
    screen: MedicineScreen,
    TabIcon: PillListIcon,
  },
  reminders: {
    screen: RemindersScreen,
    TabIcon: ClipBoardListIcon,
  },
};

const routeNames = Object.keys(routes) as Array<keyof typeof routes>;

const routeConfig: RouteConfigType<typeof routes> = {
  routeNames: routeNames,
  initialRouteName: 'home',
  routes,
};

export default routeConfig;
