import React from 'react';
import { Button } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, body, onConfirm, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in-up">
            <div className="bg-foundation-light border border-neon-surge/50 shadow-[0_0_20px_rgba(0,255,192,0.2)] rounded-xl w-full max-w-md">
                <div className="p-5 border-b border-[#333]">
                    <h3 className="font-orbitron text-lg text-neon-surge uppercase tracking-wider">{title}</h3>
                </div>
                <div className="p-5 text-sm text-white font-jetbrains-mono">
                    {body}
                    <p className="mt-4 text-xs text-warning-high">This action is irreversible.</p>
                </div>
                <div className="p-5 flex justify-end gap-3 border-t border-[#333]">
                    <Button onClick={onClose} variant="ghost">
                        CANCEL
                    </Button>
                    <Button onClick={onConfirm} variant="destructive">
                        CONFIRM PURGE
                    </Button>
                </div>
            </div>
        </div>
    );
};
