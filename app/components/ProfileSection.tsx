"use client";
import Image from "next/image";

export const ProfileSection = () => {
  return (
    <div className="w-full pb-16 md:py-0 px-6 pt-10 ">
      <div className="space-y-8 text-center">
        <div className="relative w-28 md:w-40 h-28 md:h-40 mx-auto">
          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-gray-200">
            <Image
              src="/portrait.jpeg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Yahel Cohen
          </h1>
          <h2 className="text-lg md:text-xl">Software Engineer</h2>
          <div className="h-px w-16 bg-gray-300 mx-auto my-4" />
          <p className="text-sm md:text-base max-w-xs mx-auto leading-relaxed">
            3+ years building scalable systems and developing products
          </p>
        </div>

        <div className="space-y-4">
          {/* Contact Info */}
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a
              href="mailto:yahelcohen01@gmail.com"
              className="text-sm hover:text-gray-900 dark:hover:text-gray-100"
            >
              yahelcohen01@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-labelledby="title"
              className="w-4 h-4"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 
           19.79 19.79 0 0 1-8.63-3.07 
           19.5 19.5 0 0 1-6-6 
           19.79 19.79 0 0 1-3.07-8.63 
           A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 
           12.35 12.35 0 0 0 .7 2.81 
           a2 2 0 0 1-.45 2.11l-1.27 1.27 
           a16 16 0 0 0 6 6l1.27-1.27 
           a2 2 0 0 1 2.11-.45 
           12.35 12.35 0 0 0 2.81.7 
           A2 2 0 0 1 22 16.92z"
              />
            </svg>

            <a
              href="tel:+972503311372"
              rel="noopener noreferrer"
              className="text-sm hover:text-gray-900 dark:hover:text-gray-100"
            >
              +972503311372
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">Tel Aviv, Israel</span>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-2">
            <a
              href="https://github.com/yahelcohen01"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-black"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/yahelcohen"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-blue-600"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-2">
            <a
              href="/yahel-cohen--resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 dark:hover:text-gray-100 hover:text-black hover:underline"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
