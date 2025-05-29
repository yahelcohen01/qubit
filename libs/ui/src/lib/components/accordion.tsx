import { cn } from '@utils';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface AccordionContextType {
  isOpen: boolean;
  toggle: () => void;
}

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: boolean;
  bordered?: boolean;
  className?: string;
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

const Accordion = ({
  children,
  defaultOpen = false,
  bordered,
  className,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={cn(bordered ? 'border border-gray-200' : '', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionButton = ({
  children,
  className = '',
}: AccordionTriggerProps) => {
  const { isOpen, toggle } = useAccordion();

  return (
    <button
      onClick={toggle}
      className={cn(
        'w-full px-4 py-1 text-left flex justify-between items-center cursor-pointer',
        className
      )}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <svg
        className={cn(
          'h-4 transition-transform duration-300 ',
          isOpen ? 'rotate-180' : ''
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

const AccordionPanel = ({
  children,
  className = '',
}: AccordionContentProps) => {
  const { isOpen } = useAccordion();

  if (!isOpen) return null;

  return <div className={cn('px-4 py-1', className)}>{children}</div>;
};

export { Accordion, AccordionButton, AccordionPanel };
