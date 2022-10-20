import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore } from 'redux';
import allReducers from './Redux/Reducers/combined'
import { Provider } from 'react-redux'
import { CartProvider } from './Store/cart-context';

const store = legacy_createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </Provider>
);