import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@shared/lib";
import { Card, SetState } from "@shared/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@shared/icons";

type Navigation = "arrows" | "dots" | "both" | "none";

interface CarouselProps {
  cards: Card[];
  cardsPerPage?: number;
  autoplay?: boolean;
  navigation?: Navigation;
  pageInterval?: number;
}

export const CardsCarousel = ({
  cards,
  cardsPerPage = 3,
  autoplay = false,
  navigation = "dots",
  pageInterval = 3000,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  useEffect(() => {
    if (!autoplay || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, pageInterval);

    return () => clearInterval(interval);
  }, [autoplay, totalPages, pageInterval]);

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No cards to display
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
                  {cards
                    .slice(
                      pageIndex * cardsPerPage,
                      (pageIndex + 1) * cardsPerPage
                    )
                    .map((card) => (
                      <div
                        key={card.name}
                        className="mx-auto border-t border-t-white hover:bg-white transition-colors duration-500"
                      >
                        <Image
                          src={card.img}
                          alt={card.name}
                          width={224}
                          height={224}
                          className="max-h-full object-contain"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalPages > 1 &&
        navigationControls({
          navigation,
          currentPage,
          totalPages,
          setCurrentPage,
        })}
    </div>
  );
};

const navigationControls = ({
  navigation,
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  navigation: Navigation;
  currentPage: number;
  totalPages: number;
  setCurrentPage: SetState<number>;
}) => {
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const Arrows = () => (
    <>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={prevPage}
          className="z-10 bg-white/20 rounded-full p-2 cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <button
          onClick={nextPage}
          className="z-10 bg-white/20 rounded-full p-2 cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );

  const Dots = () => (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index)}
          className={cn(
            "size-2 rounded-full transition-all duration-200 cursor-pointer",
            index === currentPage
              ? "bg-black scale-110"
              : "bg-black hover:scale-110"
          )}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );

  if (navigation === "none") return null;
  if (navigation === "arrows") {
    return <Arrows />;
  }
  if (navigation === "dots") {
    return <Dots />;
  }
  if (navigation === "both") {
    return (
      <>
        <Arrows />
        <Dots />
      </>
    );
  }
  return null;
};
