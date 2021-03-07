import React from 'react';
import {Provider} from 'react-redux';
import store from './redux';
import AppNavigation from './navigations';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
