import React, { useEffect } from 'react';
import { Icons } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
      
      <div className="relative bg-foundation-light border border-[#333] rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 ease-in-out animate-fadeIn">
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h2 id="modal-title" className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">{title}</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-white transition-colors">
            <Icons.X className="h-6 w-6" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};