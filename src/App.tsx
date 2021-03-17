import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import AppNavigation from './navigations';

store.subscribe(() => console.log(store.getState()));

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
