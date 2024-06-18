import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store.js';
import { ChakraProvider } from '@chakra-ui/react';
import { ScrollRestoration } from "react-router-dom";
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/js/theme.js';

import { extendTheme } from "@chakra-ui/react";

const myTheme = extendTheme({
  fonts: {
    body: "gordita, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={myTheme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)