import { Fragment, useEffect, useRef, useState } from 'react';
import { Calendar } from '@carbon/icons-react';
import { SiGooglecalendar, SiApple } from 'react-icons/si';
import { PiMicrosoftOutlookLogoFill } from 'react-icons/pi';

import { ConditionalWrapper } from './conditional-wrapper';
import { Tooltip } from './tooltip';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface AddToCalendarProps {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  description?: string;
  tooltip?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
}

export const AddToCalendarButton = ({
  name,
  location,
  startDate,
  endDate,
  startTime,
  endTime,
  timeZone,
  description = '',
  tooltip,
  buttonClassName, //= 'flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors',
  children,
}: AddToCalendarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Parse dates and times to create proper calendar event times
  const formatCalendarTime = (dateStr: string, timeStr: string) => {
    // If no time provided, use 00:00
    if (!timeStr) return new Date(dateStr).toISOString();

    const date = new Date(dateStr);
    const [timePart, meridiem] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    // Convert from 12-hour to 24-hour format if PM
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;

    date.setHours(hours, minutes || 0, 0, 0);
    return date.toISOString();
  };

  const formattedStart = formatCalendarTime(startDate, startTime);
  const formattedEnd = formatCalendarTime(endDate, endTime || startTime);

  // Create Google Calendar URL
  const googleCalendarUrl = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: name,
      dates: `${formattedStart.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')}/${formattedEnd.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')}`,
      details: description || '',
      location,
      ctz: timeZone,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Create ICS file (works with Apple Calendar, Outlook, etc.)
  const generateICSFile = () => {
    const formatICSDate = (dateStr: string) => {
      return dateStr.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${name}`,
      `DTSTART:${formatICSDate(formattedStart)}`,
      `DTEND:${formatICSDate(formattedEnd)}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description?.replace(/\n/g, '\\n') || ''}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
      `UID:${Math.random().toString(36).substring(2)}@yourdomain.com`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name.replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create Outlook Web URL
  const outlookWebUrl = () => {
    const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
    const params = new URLSearchParams({
      subject: name,
      startdt: formattedStart,
      enddt: formattedEnd,
      body: description || '',
      location,
    });

    return `${baseUrl}?${params.toString()}`;
  };
  const divRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // viewport is used as the root
      rootMargin: '0px',
      threshold: 0, // trigger as soon as even one pixel is visible/invisible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Element is no longer visible (scrolled off)
          setShowDropdown(false);
        }
      });
    }, options);

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    // Clean up
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <Popover className="relative" ref={divRef}>
      {/* Using a div as a wrapper for proper hover management */}
      <div className="group">
        <ConditionalWrapper
          condition={!!tooltip}
          wrapper={(children) => (
            <Tooltip content={tooltip} className="text-xs" showDelay={400}>
              {children}
            </Tooltip>
          )}
        >
          <PopoverButton
            className={twMerge(
              'inline-flex items-center gap-x-1 text-sm/6 font-semibold',
              buttonClassName,
            )}
            onClick={() => setShowDropdown(!showDropdown)}
            onBlur={() => setShowDropdown(false)}
          >
            <>
              {children || (
                <>
                  <Calendar size={16} className="mr-1" />
                  <span>Add to Calendar</span>
                </>
              )}
            </>
          </PopoverButton>
        </ConditionalWrapper>

        <Transition
          show={showDropdown}
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
            className="absolute z-10 mt-0 flex w-screen max-w-max -translate-x-1/2 px-4"
          >
            <div className="absolute z-10 w-3xs bg-primary shadow-lg border border-gray-900">
              <div role="menu" aria-orientation="vertical">
                <a
                  href={googleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 gap-2 items-center"
                  role="menuitem"
                >
                  <SiGooglecalendar />
                  Google Calendar
                </a>
                <button
                  onClick={(e) => {
                    generateICSFile();
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                  role="menuitem"
                >
                  <SiApple />
                  Apple Calendar / Outlook
                </button>
                <a
                  href={outlookWebUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  role="menuitem"
                >
                  <PiMicrosoftOutlookLogoFill />
                  Outlook Web
                </a>
              </div>
            </div>
          </PopoverPanel>
        </Transition>
      </div>
    </Popover>
  );
};
