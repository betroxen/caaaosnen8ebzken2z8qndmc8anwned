import React, { createContext, useContext, useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { Icons } from './icons';

interface AccordionContextType {
  openValues: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export const Accordion = ({ children, multiple = false, defaultOpen = [] }: { children: ReactNode, multiple?: boolean, defaultOpen?: string[] }) => {
  const [openValues, setOpenValues] = useState(defaultOpen);

  const toggleItem = (value: string) => {
    setOpenValues(prev => {
      if (multiple) {
        return prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      } else {
        return prev.includes(value) ? [] : [value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ children, value }: { children: ReactNode, value: string }) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  const isOpen = context.openValues.includes(value);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { value, isOpen } as any);
    }
    return child;
  });

  return (
    <div className="border-b border-[#333] last:border-b-0">
      {childrenWithProps}
    </div>
  );
};

export const AccordionTrigger = ({ children, value, isOpen }: { children: ReactNode, value?: string, isOpen?: boolean }) => {
  const context = useContext(AccordionContext);
  if (!context || value === undefined) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  return (
    <button
      className="flex w-full items-center justify-between py-4 text-left group transition-colors focus:outline-none"
      onClick={() => context.toggleItem(value)}
      aria-expanded={isOpen}
    >
      <div className="flex-1">
        {children}
      </div>
      <Icons.ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} text-neon-surge`} />
    </button>
  );
};

export const AccordionContent = ({ children, isOpen }: { children: ReactNode, isOpen?: boolean }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(isOpen ? 'auto' : '0px');

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  return (
    <div
      ref={contentRef}
      style={{ height, transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      className="overflow-hidden"
    >
      {children}
    </div>
  );
};