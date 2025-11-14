import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UKDigitalWalletArchitecture from './UKDigitalWalletArchitecture';
import UKDigitalWalletCredentials from './UKDigitalWalletCredentials';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UKDigitalWalletArchitecture />
    {/* <UKDigitalWalletCredentials /> */}
  </React.StrictMode>
);
