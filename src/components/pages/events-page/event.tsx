import { useEffect, useRef } from 'react';
import { Location, Time } from '@carbon/icons-react';
import { type Event } from '@/types';
import { Breadcrumbs } from '@/components/ui';

interface EventProps {
  event: Event;
}

export function Event({ event }: EventProps) {
  return (
    <div className="relative isolate overflow-hidden bg-primary px-6 py-8 sm:py-8 lg:overflow-visible lg:px-0">
      <div className="flex justify-start items-center mx-auto px-8 pb-4">
        <Breadcrumbs autoGenerate />
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-full lg:grid-cols-4 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <p className="text-base/7 font-semibold text-secondary">
              {event.type}
            </p>
            <h1 className=" text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-6 text-xl/8 text-gray-700">{event.description}</p>
          </div>
        </div>
        <div className="lg:pr-12 lg:sticky lg:top-40 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:overflow-hidden grid sm:grid-cols-2 lg:grid-cols-1">
          <div className="grid bg-white h-48 p-8 gap-2">
            <div className="flex items-center gap-2">
              <Location size={30} />
              <span className="text-gray-700 text-sm font-light">
                {event.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Time size={30} />
              <span className="text-gray-700 text-sm font-light">
                {event.time}
              </span>
              <span className="text-gray-700 text-sm font-light">
                {event.date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="h-48 rounded-b-md">
            <AppleMap />
          </div>
        </div>
        <div className="lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-full text-base/7 text-gray-700 ">
              <p>{event.additionalDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript declarations for Apple MapKit JS
declare global {
  interface Window {
    mapkit: {
      init(options: MapKitInitOptions): void;
      Map: new (containerID: string | HTMLElement) => MapKit;
      Coordinate: new (latitude: number, longitude: number) => Coordinate;
      MarkerAnnotation: new (
        coordinate: Coordinate,
        options?: MarkerAnnotationOptions,
      ) => MarkerAnnotation;
    };
  }
}

// MapKit type definitions
interface MapKitInitOptions {
  authorizationCallback: (done: (token: string) => void) => void;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MapKit {
  showItems: (items: MarkerAnnotation[]) => void;
  addAnnotation: (annotation: MarkerAnnotation) => void;
  removeAnnotation: (annotation: MarkerAnnotation) => void;
  convertPointOnPageToCoordinate: (point: DOMPoint) => Coordinate;
  element: HTMLElement;
}

interface MarkerAnnotationOptions {
  color?: string;
  title?: string;
  subtitle?: string;
  glyphText?: string;
  selected?: boolean;
}

interface MarkerAnnotation {
  coordinate: Coordinate;
  color: string;
  title: string;
  subtitle?: string;
  selected: boolean | string;
  glyphText: string;
}

const AppleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<MapKit | null>(null);
  const clickAnnotationRef = useRef<MarkerAnnotation | null>(null);

  useEffect(() => {
    // Define a function to initialize the map
    const initializeMap = (): void => {
      if (!window.mapkit || mapInstance.current || !mapRef.current) return;

      const { MarkerAnnotation } = window.mapkit;

      const sfo = new window.mapkit.Coordinate(37.616934, -122.38379);
      const work = new window.mapkit.Coordinate(37.3349, -122.0090201);

      // Initialize MapKit JS
      window.mapkit.init({
        authorizationCallback: function (done) {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', '/services/jwt');
          xhr.addEventListener('load', function () {
            done(this.responseText);
          });
          xhr.send();
        },
      });

      // Create the map instance
      mapInstance.current = new window.mapkit.Map(mapRef.current);

      // Setting properties on creation:
      const sfoAnnotation = new MarkerAnnotation(sfo, {
        color: '#f4a56d',
        title: 'SFO',
        glyphText: '✈️',
      });

      // Setting properties after creation:
      const workAnnotation = new MarkerAnnotation(work);
      workAnnotation.color = '#969696';
      workAnnotation.title = 'Work';
      workAnnotation.subtitle = 'Apple Park';
      workAnnotation.selected = 'true';
      workAnnotation.glyphText = '';

      // Add and show both annotations on the map
      mapInstance.current.showItems([sfoAnnotation, workAnnotation]);
    };

    // Load the MapKit JS script
    const loadMapKitScript = (): void => {
      if (window.mapkit) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js';
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadMapKitScript();

    // Set up the click handler for the map
    const handleMapClick = (event: MouseEvent): void => {
      if (!event.shiftKey || !mapInstance.current || !window.mapkit) {
        return;
      }

      if (clickAnnotationRef.current) {
        mapInstance.current.removeAnnotation(clickAnnotationRef.current);
      }

      const coordinate = mapInstance.current.convertPointOnPageToCoordinate(
        new DOMPoint(event.pageX, event.pageY),
      );

      clickAnnotationRef.current = new window.mapkit.MarkerAnnotation(
        coordinate,
        {
          title: 'Click!',
          color: '#c969e0',
        },
      );

      mapInstance.current.addAnnotation(clickAnnotationRef.current);
    };

    // Add event listener for clicks
    document.addEventListener('click', handleMapClick);

    // Clean up on component unmount
    return () => {
      document.removeEventListener('click', handleMapClick);
      // Clean up map instance if needed
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={mapRef} className="h-48 w-full"></div>
    </div>
  );
};
