import React, { useContext } from 'react';
import { ToastContext, ToastContextType } from '../context/ToastContext';
import { Toast } from './Toast';

export const Toaster: React.FC = () => {
  const context = useContext(ToastContext);

  if (!context) {
    return null;
  }

  const { toasts, removeToast } = context as ToastContextType;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-end justify-start p-4 sm:p-6 pointer-events-none"
      aria-live="polite"
    >
      <div className="w-full max-w-sm space-y-4">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
             <Toast toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </div>
  );
};
