import { Fragment, type ReactNode } from 'react';
import {
  Dialog as HeadlessDialog,
  Transition,
  TransitionChild,
  DialogPanel as HeadlessDialogPanel,
  DialogTitle as HeadlessDialogTitle,
  DialogDescription as HeadlessDialogDescription,
} from '@headlessui/react';
import { Close } from '@carbon/icons-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top';
  footer?: ReactNode;
  fullscreen?: boolean;
}

export const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = 'md',
  position = 'center',
  footer,
  fullscreen = false,
}: DialogProps) => {
  // Define size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md mx-4',
    lg: 'max-w-lg mx-4',
    xl: 'max-w-xl mx-4',
    full: 'max-w-full mx-4',
  };

  // Define position classes
  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-16',
  };

  // Fullscreen classes override size and position
  const dialogClasses = fullscreen
    ? 'fixed inset-0 w-full h-full max-w-none mx-0 rounded-none'
    : `w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg`;

  const containerClasses = fullscreen
    ? 'flex h-full'
    : `flex min-h-full justify-center ${positionClasses[position]}`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-50"
        onClose={closeOnOverlayClick ? onClose : () => {}}
      >
        {/* Overlay - hidden in fullscreen mode */}
        {!fullscreen && (
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-70"
            leave="ease-in duration-200"
            leaveFrom="opacity-70"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-70 backdrop-blur-sm" />
          </TransitionChild>
        )}

        {/* Dialog positioning */}
        <div
          className={
            fullscreen ? 'fixed inset-0' : 'fixed inset-0 overflow-y-auto'
          }
        >
          <div className={containerClasses}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom={fullscreen ? 'opacity-0' : 'opacity-0 scale-95'}
              enterTo={fullscreen ? 'opacity-100' : 'opacity-100 scale-100'}
              leave="ease-in duration-200"
              leaveFrom={fullscreen ? 'opacity-100' : 'opacity-100 scale-100'}
              leaveTo={fullscreen ? 'opacity-0' : 'opacity-0 scale-95'}
            >
              <HeadlessDialogPanel
                className={`${dialogClasses} bg-white p-6 shadow-xl transition-all ${
                  fullscreen ? 'overflow-y-auto' : ''
                } ${className}`}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {title && (
                        <HeadlessDialogTitle
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {title}
                        </HeadlessDialogTitle>
                      )}
                      {description && (
                        <HeadlessDialogDescription className="mt-2 text-sm text-gray-500">
                          {description}
                        </HeadlessDialogDescription>
                      )}
                    </div>
                    {showCloseButton && (
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <Close className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className={`mt-2 ${fullscreen ? 'flex-1' : ''}`}>
                  {children}
                </div>

                {/* Footer */}
                {footer && <div className="mt-6">{footer}</div>}
              </HeadlessDialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
