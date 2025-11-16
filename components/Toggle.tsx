import React from 'react';
import { useSound } from '../hooks/useSound';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  description: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => {
    const id = React.useId();
    const playToggleSound = useSound('https://files.catbox.moe/a721g6.mp3', 0.2);

    const handleChange = () => {
        playToggleSound();
        onChange(!checked);
    };

    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <label htmlFor={id} className="cursor-pointer">
                    {label}
                </label>
                <p className="text-[#8d8c9e] mt-1">{description}</p>
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={handleChange}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neon-surge focus:ring-offset-2 focus:ring-offset-foundation ${checked ? 'bg-neon-surge' : 'bg-[#333]'}`}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </button>
        </div>
    );
};