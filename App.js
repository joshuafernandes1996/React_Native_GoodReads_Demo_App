// Imports: Dependencies
import React from 'react';
import { Provider } from 'react-redux';// Imports: Screens
import BookInfo from './BookInfo/BookContainer';// Imports: Redux Store
import { store } from './store';// React Native App
import Navigator from './AppNavigator';

export default function App() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}