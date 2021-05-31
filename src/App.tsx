import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {initNotificationsManager} from './services/notifications/notifications.manager';
import AppNavigation from './navigation/AppNavigation';
import ModalMedicine from './screens/ModalMedicine';

initNotificationsManager(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalMedicine />
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
