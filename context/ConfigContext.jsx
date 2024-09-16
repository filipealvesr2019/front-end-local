// ConfigContext.js
import React, { createContext, useState } from 'react';
const localhost = 'http://localhost:3002'
const apiUrl = 'https://b06e10aeb2f1deb5e9fc2c0bf1a3dde2.serveo.net';
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    apiUrl: localhost,
  });



  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);