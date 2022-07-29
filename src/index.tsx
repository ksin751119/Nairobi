import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
import { getProvider } from './utils/provider';

import { ToastContainer } from 'react-toastify'; //ToastContainer
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
      <App />
    </Web3ReactProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>,
  document.getElementById('root')
);
