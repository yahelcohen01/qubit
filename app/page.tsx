"use client";
import { ResponsiveLayout } from "./components/responsive-layout";

export default function MinimalistPortfolio() {
  return (
    <main className="min-h-screen md:h-screen flex flex-col pb-16 sm:pb-0">
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          ResponsiveLayout Demo
        </h1>

        <ResponsiveLayout
          columns={{ lg: 4, md: 2, sm: 1 }}
          gap="gap-6"
          className="mb-8"
        >
          {/* Demo cards */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Card {i + 1}
              </h3>
              <p className="text-gray-600">
                This is a demo card showing how the ResponsiveLayout component
                works. On mobile (sm): 1 column, tablet (md): 2 columns, desktop
                (xl): 4 columns.
              </p>
            </div>
          ))}
        </ResponsiveLayout>

        {/* Another example with different column configuration */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Different Column Setup (3-2-1)
        </h2>

        <ResponsiveLayout columns={{ lg: 3, md: 2, sm: 1 }} gap="gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white"
            >
              <h4 className="text-xl font-bold mb-2">Item {i + 1}</h4>
              <p>Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col</p>
            </div>
          ))}
        </ResponsiveLayout>
      </div>
    </main>
  );
}
