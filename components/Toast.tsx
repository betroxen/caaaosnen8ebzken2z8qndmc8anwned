import React, { useEffect, useState } from 'react';
import { Icons } from './icons';
import { ToastMessage } from '../context/ToastContext';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

const toastConfig = {
  success: {
    icon: Icons.Verified,
    barClass: 'bg-neon-surge',
    iconClass: 'text-neon-surge',
  },
  error: {
    icon: Icons.AlertTriangle,
    barClass: 'bg-warning-high',
    iconClass: 'text-warning-high',
  },
  info: {
    icon: Icons.HelpCircle,
    barClass: 'bg-blue-500',
    iconClass: 'text-blue-400',
  },
  warning: {
    icon: Icons.AlertTriangle,
    barClass: 'bg-warning-low',
    iconClass: 'text-warning-low',
  },
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4700);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);
  
  const handleDismiss = () => {
      setIsExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
  }

  const { icon: Icon, barClass, iconClass } = toastConfig[toast.type] || toastConfig.info;

  return (
    <div
      className={`relative w-full max-w-sm overflow-hidden rounded-lg bg-foundation-light shadow-2xl ring-1 ring-[#333] transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${barClass}`}></div>
      <div className="flex items-start p-4 pl-4">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${iconClass}`} aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-text-primary font-rajdhani">{toast.message}</p>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            onClick={handleDismiss}
            className="inline-flex rounded-md bg-transparent text-text-tertiary hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-surge"
          >
            <span className="sr-only">Close</span>
            <Icons.X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};