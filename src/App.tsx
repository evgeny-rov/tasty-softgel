import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import AppNavigation from './navigation';
import {systemRevive, systemStep} from './redux/entities/system/system.actions';

const updateSystemState = () => {
  store.dispatch(systemStep());
};

const App = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = store.getState().system.currentHour;
      const currentHour = new Date().getHours();

      console.log('state recheck', currentSystemHour, currentHour);
      currentHour > currentSystemHour && updateSystemState();
    }, 10000);

    store.dispatch(
      systemRevive({
        lastConfirmationAt: store.getState().system.lastConfirmationAt,
      }),
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
