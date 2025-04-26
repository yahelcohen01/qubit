import { useState, Fragment, useRef, useEffect } from 'react';
import {
  Dialog,
  Transition,
  DialogPanel,
  TransitionChild,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { Menu as MenuIcon, Close as CloseIcon } from '@carbon/icons-react';
import { useMedia } from 'react-use';
import { RoundedSlideButton } from './RoundedSlideButton';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isWide = useMedia('(min-width: 1024px)');

  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const timeoutRef = useRef<any | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay to prevent flickering when moving between button and panel
    timeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 backdrop-blur-3xl z-10">
      <div className="py-6 flex items-center justify-between px-8 w-full justify-self-center-safe">
        <div className="flex justify-between items-center flex-1">
          <a href="#" className="text-xl font-bold michroma-font">
            QUBIT
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-800"
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
              <a
                key={item.name}
                href={item.href}
                className="block text-base font-light fancy-link"
              >
                {item.name}
              </a>
            ))}
            <Popover className="relative">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                  <span>Solutions</span>
                </PopoverButton>

                <Transition
                  show={solutionsOpen}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    static
                    className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                      <div className="p-4">
                        {navigation.map((item) => (
                          <div
                            key={item.name}
                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                          >
                            <div>
                              <a
                                href={item.href}
                                className="font-semibold text-gray-900"
                              >
                                {item.name}
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt-1 text-gray-600">
                                {'asmskmcksmcsk'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </div>
            </Popover>
            <RoundedSlideButton>Join Our Newsletter</RoundedSlideButton>
          </nav>
        ) : null}
      </div>
      <div className="bg-black h-[1px] w-auto" />
    </header>
  );
}

function SidebarTransition({
  setMobileMenuOpen,
  mobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <Transition show={mobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setMobileMenuOpen}
      >
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

        <div className="fixed inset-0 flex justify-end">
          <TransitionChild
            as={Fragment}
            enter="transition transform duration-300 ease-out"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition transform duration-200 ease-in"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel className="w-full max-w-sm p-6 shadow-xl bg-[#f5f5f7]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <CloseIcon className="w-6 h-6 text-gray-800" />
                </button>
              </div>
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-base font-medium"
                  >
                    {item.name}
                  </a>
                ))}
                <a href="#" className="block text-indigo-600 font-semibold">
                  Log in
                </a>
              </nav>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
