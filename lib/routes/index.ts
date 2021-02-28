import HomeScreen from '../screens/HomeScreen';
import MedicineScreen from '../screens/MedicineScreen';
import RemindersScreen from '../screens/RemindersScreen';
import {HomeIcon, ClipBoardListIcon, PillListIcon} from '../components/icons';

const routes = [
  {name: 'Home', component: HomeScreen, icon: HomeIcon},
  {name: 'MedicineScreen', component: MedicineScreen, icon: PillListIcon},
  {
    name: 'RemindersScreen',
    component: RemindersScreen,
    icon: ClipBoardListIcon,
  },
];

export default routes;
