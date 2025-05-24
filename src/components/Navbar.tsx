import { useState, Fragment, useEffect, useRef } from 'react';
import {
  Dialog,
  Transition,
  DialogPanel,
  TransitionChild,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChevronDown,
} from '@carbon/icons-react';
import { useMedia } from 'react-use';
import { Button, RoundedSlideButton } from './ui';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from '@tanstack/react-router';

// Define your navigation structure with proper typing
interface NavChild {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href: string;
  children?: NavChild[];
}

const navigation: NavItem[] = [
  {
    name: 'Events',
    href: 'events',
  },
  { name: 'Podcast', href: '/podcast' },
  {
    name: 'Publications',
    href: '/knowledge-base',
  },
  {
    name: 'Courses',
    href: '#',
    children: [
      {
        name: 'External courses',
        href: '#',
        description: 'Courses offered by external institutions',
      },
      {
        name: 'General courses',
        href: '#',
        description: 'General courses on quantum computing',
      },
    ],
  },
];

// Create a PopoverMenu component to handle each dropdown
const PopoverMenu = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay to prevent flickering when moving between button and panel
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Make sure the timeout is cleared when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!item.children?.length) {
    return (
      <a href={item.href} className="block text-base font-light fancy-link">
        {item.name}
      </a>
    );
  }

  return (
    <Popover className="relative">
      {/* Using a div as a wrapper for proper hover management */}
      <div
        className="group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold">
          <a href={item.href} className="block text-base font-light fancy-link">
            {item.name}
          </a>
        </PopoverButton>

        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"
          >
            <div className="w-screen max-w-md flex-auto overflow-hidden bg-primary text-sm/6 shadow-sm ring-1 ring-black/50">
              <div className="flex-col gap-1 p-4">
                {item.children.map((child) => (
                  <div
                    key={child.name}
                    className="group relative flex gap-x-6 m-2"
                  >
                    <div>
                      <a
                        href={child.href}
                        className="font-semibold text-gray-900"
                      >
                        {child.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{child.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverPanel>
        </Transition>
      </div>
    </Popover>
  );
};

// Mobile menu accordion item component
const MobileMenuItem = ({ item }: { item: NavItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show expand/collapse UI if there are children
  if (!item.children?.length) {
    return (
      <div className="flow-root">
        <a
          href={item.href}
          className="-m-2 block p-2 font-medium text-gray-900"
        >
          {item.name}
        </a>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <a href={item.href} className="-m-2 block p-2 font-medium">
          {item.name}
        </a>
        <button className="p-2 focus:outline-none">
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      <Transition
        show={isExpanded}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-96"
        leave="transition-all duration-200 ease-in"
        leaveFrom="opacity-100 max-h-96"
        leaveTo="opacity-0 max-h-0"
      >
        <div className="ml-4 mt-2 space-y-2">
          {item.children.map((child) => (
            <a
              key={child.name}
              href={child.href}
              className="-m-2 block p-2 text-gray-500 hover:text-gray-900"
            >
              {child.name}
            </a>
          ))}
        </div>
      </Transition>
    </div>
  );
};

// SidebarTransition component without the dark overlay
const SidebarTransition = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  return (
    <Transition show={mobileMenuOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setMobileMenuOpen}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-xs" />
        </TransitionChild>
        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-primary py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <a href="#" className="text-xl font-bold michroma-font">
                  QUBIT
                </a>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <CloseIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-8 space-y-6 px-4">
                {navigation.map((item) => (
                  <MobileMenuItem key={item.name} item={item} />
                ))}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isWide = useMedia('(min-width: 1024px)');

  return (
    <header className="sticky top-0 backdrop-blur-3xl z-10">
      <div className="py-6 flex items-center justify-between px-8 w-full justify-self-center-safe">
        <div className="flex justify-between items-center flex-1">
          <Link to="/" className="text-xl font-bold michroma-font">
            QUBIT
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-800 cursor-pointer"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
        <SidebarTransition
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {isWide ? (
          <nav className="flex gap-6 items-center">
            {navigation.map((item) => (
              <PopoverMenu key={item.name} item={item} />
            ))}

            <RoundedSlideButton
              onClick={() => {
                window.open('https://qubitil.substack.com/', '_blank');
              }}
            >
              Join Our Newsletter
            </RoundedSlideButton>
          </nav>
        ) : null}
      </div>
      <div className="bg-black h-[1px] w-auto" />
    </header>
  );
}
