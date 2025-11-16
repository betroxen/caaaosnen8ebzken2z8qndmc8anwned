import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { useSound } from '../hooks/useSound';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const playNotificationSound = useSound('https://files.catbox.moe/k4vcuv.mp3', 0.3);
  
  const showToast = useCallback((message: string, type: ToastMessage['type']) => {
    const id = Date.now() + Math.random();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    playNotificationSound();
  }, [playNotificationSound]);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};