import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import {store, persistor, bootstrapPersistor} from './redux/store';
import {initMedicationsNotifications} from './services/notifications/medications';
import MedicationModal from './screens/MedicationModal';
import AppNavigation from './navigation/';
import AppWrapper from '@components/AppWrapper';

initMedicationsNotifications({store, persistor, bootstrapPersistor});

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
