import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor, onStartUp} from './redux/store';
import AppNavigation from './navigation/AppNavigation';
import {initNotificationsManager} from './services/notifications/notifications.manager';

initNotificationsManager(store);

const App = () => {
  useEffect(() => {
    onStartUp(store);
  }, []);

  return <AppNavigation />;
};

const RootComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default RootComponent;
