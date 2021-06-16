import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './redux/store';
import {initNotificationsManager} from './services/notifications/notifications.manager';
import AppNavigation from './navigation/AppNavigation';
import ModalMedicine from './screens/ModalMedicine';
import AppBackground from '@components/AppBackground';

initNotificationsManager(store);

const App = () => {
  useEffect(() => {
    setTimeout(SplashScreen.hide, 0);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppBackground>
          <ModalMedicine />
          <AppNavigation />
        </AppBackground>
      </PersistGate>
    </Provider>
  );
};

export default App;
