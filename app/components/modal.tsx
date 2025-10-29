import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { cn } from "@shared/lib";
import { CloseIcon } from "../shared/icons";

interface ModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconClassName?: string;
  iconBgClassName?: string;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  icon,
  iconClassName = "size-6 text-gray-400",
  iconBgClassName,
  footer,
  size = "lg",
  showCloseButton = true,
  closeOnBackdrop = true,
}: ModalProps) {
  const handleClose = (value: boolean) => {
    if (closeOnBackdrop) {
      onClose(value);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-neutral-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={cn(
              "relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full data-closed:sm:translate-y-0 data-closed:sm:scale-95",
              sizeClasses[size]
            )}
          >
            <CloseIcon
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-300"
              onClick={() => handleClose(false)}
            />
            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {icon && (
                  <div
                    className={cn(
                      "mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10",
                      iconBgClassName
                    )}
                  >
                    <div className={iconClassName}>{icon}</div>
                  </div>
                )}
                <div
                  className={cn(
                    icon && "mt-3 sm:mt-0 sm:ml-4",
                    "text-center sm:text-left w-full"
                  )}
                >
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-white"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  {description && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">{description}</p>
                    </div>
                  )}
                  {children && <div className="mt-2">{children}</div>}
                </div>
              </div>
            </div>
            {footer !== undefined ? (
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {footer}
              </div>
            ) : showCloseButton ? (
              <div className="bg-neutral-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:w-auto"
                >
                  Close
                </button>
              </div>
            ) : null}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

// Helper component for modal actions
export function ModalActions({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Example usage components
export function ExampleUsage() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="space-y-4 p-8">
      {/* Simple Modal */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      >
        Open Simple Modal
      </button>

      <Modal
        open={open}
        onClose={setOpen}
        title="Simple Modal"
        size="md"
        description="This is a basic modal with just a title and description."
      />

      {/* Confirmation Modal */}
      <button
        onClick={() => setConfirmOpen(true)}
        className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      >
        Open Confirmation Modal
      </button>

      <Modal
        open={confirmOpen}
        onClose={setConfirmOpen}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        icon={
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        }
        iconClassName="size-6 text-red-400"
        iconBgClassName="bg-red-500/10"
        footer={
          <ModalActions>
            <button
              type="button"
              onClick={() => {
                // Handle delete
                setConfirmOpen(false);
              }}
              className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </ModalActions>
        }
      />
    </div>
  );
}
