// ConfigContext.js
import React, { createContext, useState } from 'react';
const localhost = 'http://localhost:3002'
const ngrok = " https://1ebb-2804-1a04-804f-e800-ccba-cd15-961b-6945.ngrok-free.app"
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    apiUrl: ngrok,
  });

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);