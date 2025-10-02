import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@shared/icons";
import { cn } from "@shared/lib";
import { CarouselItem, SetState } from "@shared/types";

type Navigation = "arrows" | "dots" | "both" | "none";

interface BaseProps<T extends CarouselItem> {
  items: T[];
  variant?: "cards" | "slides";
  navigation?: Navigation;
  autoplay?: boolean;
  pageInterval?: number;
  renderItem?: ({ item, index }: { item: T; index: number }) => React.ReactNode;
}

interface CardsOptions {
  cardsPerPage?: number;
}

interface SlidesOptions {
  visiblePercentage?: number;
  gapPx?: number;
}

export type CarouselProps<T extends CarouselItem> = BaseProps<T> &
  Partial<CardsOptions & SlidesOptions>;

export function Carousel<T extends CarouselItem>({
  items,
  variant = "cards",
  navigation,
  autoplay = false,
  pageInterval = 3000,
  renderItem,
  cardsPerPage = 3,
  visiblePercentage = 60,
  gapPx = 24,
}: CarouselProps<T>) {
  const defaultNavigation =
    navigation ?? (variant === "cards" ? "dots" : "arrows");

  return variant === "cards" ? (
    <CardsVariant
      items={items}
      cardsPerPage={cardsPerPage}
      autoplay={autoplay}
      navigation={defaultNavigation}
      pageInterval={pageInterval}
      renderItem={renderItem}
    />
  ) : (
    <SlidesVariant
      items={items}
      visiblePercentage={visiblePercentage}
      gapPx={gapPx}
      autoplay={autoplay}
      navigation={defaultNavigation}
      pageInterval={pageInterval}
      renderItem={renderItem}
    />
  );
}

function CardsVariant<T extends CarouselItem>({
  items,
  cardsPerPage = 3,
  autoplay = false,
  navigation = "dots",
  pageInterval = 3000,
  renderItem,
}: CarouselProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(items.length / cardsPerPage));

  useEffect(() => {
    if (!autoplay || totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, pageInterval);
    return () => clearInterval(interval);
  }, [autoplay, totalPages, pageInterval]);

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No items
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div
                  className={cn(
                    "grid gap-6",
                    cardsPerPage === 1
                      ? "grid-cols-1"
                      : cardsPerPage === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : cardsPerPage === 3
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : cardsPerPage === 4
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-3"
                  )}
                >
                  {items
                    .slice(
                      pageIndex * cardsPerPage,
                      (pageIndex + 1) * cardsPerPage
                    )
                    .map((item, idx) => (
                      <div key={item.title ?? `card-${pageIndex}-${idx}`}>
                        {renderItem ? (
                          renderItem({
                            item,
                            index: pageIndex * cardsPerPage + idx,
                          })
                        ) : (
                          <div className="mx-auto border-t border-t-white hover:bg-white transition-colors duration-500">
                            <img
                              src={item.img}
                              alt={item.title ?? `item-${idx}`}
                              className="max-h-full object-contain mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalPages > 1 &&
        NavigationControls({
          navigation,
          currentPage,
          totalPages,
          setCurrentPage,
        })}
    </div>
  );
}

function SlidesVariant<T extends CarouselItem>({
  items,
  visiblePercentage = 100,
  gapPx = 24,
  autoplay = false,
  navigation = "arrows",
  pageInterval = 3000,
  renderItem,
}: CarouselProps<T> & { visiblePercentage?: number; gapPx?: number }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [itemWidthPx, setItemWidthPx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      const cw = viewportRef.current?.offsetWidth ?? 0;
      const iw = firstItemRef.current?.offsetWidth ?? 0;
      setContainerWidth(cw);
      setItemWidthPx(iw);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (firstItemRef.current) ro.observe(firstItemRef.current);
    return () => ro.disconnect();
  }, [visiblePercentage]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(items.length - 1, i + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, pageInterval);
    return () => clearInterval(interval);
  }, [autoplay, items.length, pageInterval]);

  const translateX =
    containerWidth && itemWidthPx
      ? containerWidth / 2 - itemWidthPx / 2 - index * (itemWidthPx + gapPx)
      : 0;

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No items
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-8">
      <div className="relative">
        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            className="flex items-center"
            style={{ gap: gapPx }}
            animate={{ x: translateX }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
          >
            {items.map((item, i) => (
              <div
                ref={i === 0 ? firstItemRef : undefined}
                key={i}
                className={cn("flex-shrink-0 overflow-hidden cursor-pointer")}
                onClick={() => setIndex(i)}
                style={{ width: `${visiblePercentage}%` }}
              >
                {renderItem ? (
                  renderItem({ item, index: i })
                ) : (
                  <div className="relative h-64 sm:h-80 md:h-96">
                    <img
                      src={item.img}
                      alt={item.title ?? `item-${i}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                      <h3 className="text-sm sm:text-base font-semibold">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs sm:text-sm opacity-90">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {items.length > 1 &&
          NavigationControls({
            navigation,
            currentPage: index,
            totalPages: items.length,
            setCurrentPage: setIndex,
          })}
      </div>
    </div>
  );
}

function NavigationControls({
  navigation,
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  navigation: Navigation;
  currentPage: number;
  totalPages: number;
  setCurrentPage: SetState<number>;
}) {
  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage((p) => (p + 1) % totalPages);
  const prevPage = () =>
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  const Arrows = (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={prevPage}
        className="z-10 bg-white/20 rounded-full p-4 cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={nextPage}
        className="z-10 bg-white/20 rounded-full p-4 cursor-pointer"
        aria-label="Next"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );

  const Dots = (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={cn(
            "size-2 rounded-full transition-all duration-200 cursor-pointer",
            i === currentPage
              ? "bg-black scale-110"
              : "bg-black hover:scale-110"
          )}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  );

  if (navigation === "none") return null;
  if (navigation === "arrows") return Arrows;
  if (navigation === "dots") return Dots;
  if (navigation === "both")
    return (
      <>
        {Arrows}
        {Dots}
      </>
    );

  return null;
}
