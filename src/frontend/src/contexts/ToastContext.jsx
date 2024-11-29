import { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastVariant, setToastVariant] = useState('primary');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message, variant = 'primary') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <ToastContext.Provider
      value={{ toastMessage, toastVariant, showToast, showToastMessage }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext };
