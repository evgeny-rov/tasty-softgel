import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import AppNavigation from './navigation';
import {initNotificationsManager} from './services/notifications/notifications.manager';

initNotificationsManager(store);

/*
const App = () => {
  const dispatch = useDispatch();

  const updateSystemState = () => {
    dispatch(systemStep());
  };

  console.log('app render');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = store.getState().system.currentHour;
      const currentHour = new Date().getHours();

      console.log('state recheck', currentSystemHour, currentHour);
      currentHour !== currentSystemHour && updateSystemState();
    }, 10000);

    dispatch(
      systemRevive({
        lastConsumptionConfirmationAt: store.getState().system
          .lastConsumptionConfirmationAt,
      }),
    );

    return () => clearInterval(intervalId);
  }, []);

  return <AppNavigation />;
};
*/

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
