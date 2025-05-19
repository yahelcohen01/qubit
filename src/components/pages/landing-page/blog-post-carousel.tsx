// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// import { useMeasure } from 'react-use';

// const CARD_WIDTH = 350;
// const MARGIN = 20;
// const CARD_SIZE = CARD_WIDTH + MARGIN;

// const BREAKPOINTS = {
//   sm: 640,
//   lg: 1024,
// };

// export const BlogPostCarousel = () => {
//   const [ref, { width }] = useMeasure<HTMLElement>();
//   const [offset, setOffset] = useState(0);

//   const CARD_BUFFER =
//     width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

//   const CAN_SHIFT_LEFT = offset < 0;

//   const CAN_SHIFT_RIGHT =
//     Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);

//   const shiftLeft = () => {
//     if (!CAN_SHIFT_LEFT) {
//       return;
//     }
//     setOffset((pv) => (pv += CARD_SIZE));
//   };

//   const shiftRight = () => {
//     if (!CAN_SHIFT_RIGHT) {
//       return;
//     }
//     setOffset((pv) => (pv -= CARD_SIZE));
//   };

//   return (
//     <section className="" ref={ref}>
//       <div className="overflow-hidden p-4">
//         <div className="max-w-full">
//           <motion.div
//             animate={{
//               x: offset,
//             }}
//             transition={{
//               ease: 'easeInOut',
//             }}
//             className="flex"
//           >
//             {posts.map((post) => {
//               return <Post key={post.id} {...post} />;
//             })}
//           </motion.div>
//           <div className="flex flex-1 items-center justify-center gap-2 pt-4">
//             <button
//               className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity cursor-pointer disabled:cursor-default ${
//                 CAN_SHIFT_LEFT ? '' : 'opacity-30'
//               }`}
//               disabled={!CAN_SHIFT_LEFT}
//               onClick={shiftLeft}
//             >
//               <FiArrowLeft />
//             </button>
//             <button
//               className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity cursor-pointer disabled:cursor-default ${
//                 CAN_SHIFT_RIGHT ? '' : 'opacity-30'
//               }`}
//               disabled={!CAN_SHIFT_RIGHT}
//               onClick={shiftRight}
//             >
//               <FiArrowRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Post = ({ author, title, description, date }: PostType) => {
//   return (
//     <div
//       className="shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
//       style={{
//         width: CARD_WIDTH,
//         marginRight: MARGIN,
//       }}
//     >
//       <div className="flex items-center justify-between">
//         <span className="rounded-md border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase text-neutral-500 items-center">
//           {author}
//         </span>
//         <span className="text-neutral-500 font-light text-xs">
//           {date.toLocaleDateString()}
//         </span>
//       </div>
//       <p className="mt-1.5 text-lg font-medium">{title}</p>
//       <p className="text-sm text-neutral-500">{description}</p>
//     </div>
//   );
// };

// type PostType = {
//   id: number;
//   imgUrl: string;
//   author: string;
//   title: string;
//   description: string;
//   date: Date;
// };

// const posts: PostType[] = [
//   {
//     id: 1,
//     imgUrl: '/imgs/blog/1.png',
//     author: 'John Anderson',
//     title: 'We built an AI chess bot with ChatGPT',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-04-01'),
//   },
//   {
//     id: 2,
//     imgUrl: '/imgs/blog/2.png',
//     author: 'Kyle Parsons',
//     title: 'How to grow your personal brand as a web designer',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-04-20'),
//   },
//   {
//     id: 3,
//     imgUrl: '/imgs/blog/3.png',
//     author: 'Andrea Bates',
//     title: 'Calm down, monoliths are totally fine',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-05-01'),
//   },
//   {
//     id: 4,
//     imgUrl: '/imgs/blog/4.png',
//     author: 'Jess Drum',
//     title: 'A quick guide to Framer Motion (for dummies)',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-05-15'),
//   },
//   {
//     id: 5,
//     imgUrl: '/imgs/blog/5.png',
//     author: 'Phil White',
//     title: "You probably don't need kubernetes",
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-06-01'),
//   },
//   {
//     id: 6,
//     imgUrl: '/imgs/blog/6.png',
//     author: 'Karen Peabody',
//     title: 'State of JavaScript in 2024',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-06-15'),
//   },
//   {
//     id: 7,
//     imgUrl: '/imgs/blog/7.png',
//     author: 'Dante Gordon',
//     title: "What's new in Python?",
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
//     date: new Date('2025-07-01'),
//   },
// ];
import { useState, useEffect, useCallback, useRef } from 'react';

// Types
interface BlogPost {
  id: number;
  author: string;
  date: string;
  title: string;
  preview: string;
}

interface BlogCarouselProps {
  posts: BlogPost[];
  autoplaySpeed?: number; // in milliseconds
}

export const BlogPostCarousel = ({
  posts,
  autoplaySpeed = 5000,
}: BlogCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<any | null>(null);

  // Update slides per view based on window size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    // Set initial value
    updateSlidesPerView();

    // Add resize listener
    window.addEventListener('resize', updateSlidesPerView);

    // Cleanup
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Format date to MM/DD/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const resetAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setTimeout(() => {
      goToNext();
    }, autoplaySpeed);
  }, [autoplaySpeed]);

  // Navigate to specific index
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with CSS transition duration

      resetAutoplayTimer();
    },
    [isTransitioning, resetAutoplayTimer],
  );

  // Navigate to previous slide
  const goToPrev = useCallback(() => {
    // Move backward by 1 position, but not below 0
    const newIndex = Math.max(currentIndex - 1, 0);
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  // Navigate to next slide
  const goToNext = useCallback(() => {
    // Move forward by 1 position, but don't exceed the total number of posts - visible slides
    const newIndex = Math.min(currentIndex + 1, posts.length - slidesPerView);
    goToSlide(newIndex);
  }, [currentIndex, posts.length, slidesPerView, goToSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Setup autoplay
  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, resetAutoplayTimer]);

  // Touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);

    // Pause any ongoing transitions when starting to touch
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);

    // If we have both start and current position, apply a real-time transform for immediate feedback
    if (touchStart && carouselRef.current) {
      const touchDiff = touchStart - e.targetTouches[0].clientX;
      const baseTransform = currentIndex * (100 / slidesPerView);

      // Calculate how much to move (with resistance at edges)
      let dragOffset = (touchDiff / carouselRef.current.offsetWidth) * 100;

      // Add resistance at edges
      if (
        (currentIndex === 0 && touchDiff < 0) ||
        (currentIndex >= posts.length - slidesPerView && touchDiff > 0)
      ) {
        dragOffset *= 0.3; // Reduced movement at edges
      }

      // Apply real-time transform
      carouselRef.current
        .querySelector('.flex')
        ?.setAttribute(
          'style',
          `transform: translateX(-${baseTransform + dragOffset / slidesPerView}%)`,
        );
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    // Restore transition for smooth sliding
    if (carouselRef.current) {
      carouselRef.current
        .querySelector('.flex')
        ?.setAttribute(
          'style',
          `transition: transform 500ms ease-in-out; transform: translateX(-${currentIndex * (100 / slidesPerView)}%)`,
        );
    }

    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0 && currentIndex < posts.length - slidesPerView) {
        goToNext();
      } else if (distance < 0 && currentIndex > 0) {
        goToPrev();
      } else {
        // Return to current position if at edge
        if (carouselRef.current) {
          carouselRef.current
            .querySelector('.flex')
            ?.setAttribute(
              'style',
              `transition: transform 500ms ease-in-out; transform: translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            );
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden px-4 py-8 ">
      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-4"
            >
              <div className="rounded-lg overflow-hidden hover:bg-gray-200 cursor-pointer transition-transform transform hover:-translate-y-1">
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="px-3 py-1 text-xs md:text-sm font-medium">
                      {post.author}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">{post.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil((posts.length - slidesPerView + 1) / 1),
        }).map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`mx-1 w-3 h-3 rounded-full focus:outline-none ${
              index === currentIndex ? 'bg-secondary' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
