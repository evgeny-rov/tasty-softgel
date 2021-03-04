import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux';
import AppNavigator from './navigations';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
