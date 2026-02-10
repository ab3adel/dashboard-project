import { createContext, useContext, useState } from 'react';
import type { Alert, AlertType } from '../interfaces.js';
import { AlertContainer } from './AlertContainer.js';


type AlertContextType = {
  showAlert: (type: AlertType, message: string) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (type: AlertType, message: string) => {
    const id = crypto.randomUUID();

    setAlerts(prev => [...prev, { id, type, message }]);

    // auto dismiss after 4s
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 4000);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertContainer alerts={alerts} onClose={removeAlert} />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlert must be used inside AlertProvider');
  }
  return ctx;
}
