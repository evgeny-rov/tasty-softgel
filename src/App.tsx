import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor, onStartUp} from './redux/store';
import AppNavigation from './navigation';
import {initNotificationsManager} from './services/notifications/notifications.manager';
import MainAppNavigator from './navigation/navigators/MainAppNavigator';

initNotificationsManager(store);

const App = () => {
  useEffect(() => {
    onStartUp(store);
  }, []);

  return <MainAppNavigator />;
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
