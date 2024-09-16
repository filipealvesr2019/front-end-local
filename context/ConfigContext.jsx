// ConfigContext.js
import React, { createContext, useState } from 'react';
const localhost = 'http://localhost:3002'
const ngrok = "https://d87e-2804-1a04-804f-e800-ccba-cd15-961b-6945.ngrok-free.app"
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