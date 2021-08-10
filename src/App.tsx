import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import {store, persistor} from './redux/store';
import initNotifications from './services/notifications';
import MedicationModal from './screens/MedicationModal';
import AppNavigation from './navigation/';
import AppWrapper from '@components/AppWrapper';

// initNotifications(store, persistor);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={SplashScreen.hide}>
        <AppWrapper>
          <MedicationModal />
          <AppNavigation />
        </AppWrapper>
      </PersistGate>
    </Provider>
  );
};

export default App;
