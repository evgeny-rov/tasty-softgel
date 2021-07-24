import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import {store, persistor} from './redux/store';
import initNotifications from './services/notifications';
import ModalMedicine from './screens/ModalMedicine';
import AppNavigation from './navigation/AppNavigation';
import AppWrapper from '@components/AppWrapper';

initNotifications(store, persistor);

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
