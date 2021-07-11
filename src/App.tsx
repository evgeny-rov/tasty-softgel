import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './redux/store';
import {initNotificationsManager} from './services/notifications/notifications.medicines';
import AppNavigation from './navigation/AppNavigation';
import ModalMedicine from './screens/ModalMedicine';
import AppWrapper from '@components/AppWrapper';

// initNotificationsManager(store, persistor);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={SplashScreen.hide}>
        <AppWrapper>
          <ModalMedicine />
          <AppNavigation />
        </AppWrapper>
      </PersistGate>
    </Provider>
  );
};

export default App;
