"use client";

import { Activity } from "@shared/types";
import Activities from "@/data/activities.json";
import { DateUtils } from "@shared/lib";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

const EVENTS_PER_PAGE = 10;

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Process activities with defaults
  const allActivities: Activity[] = useMemo(
    () =>
      Activities.map((activity) => ({
        ...activity,
        date: activity.date || "TBA",
        img:
          activity.img.length === 0 ? "assets/activities-bg.jpg" : activity.img,
      })),
    [],
  );

  // Extract unique locations and years for filters
  const locations = useMemo(() => {
    const locs = new Set<string>();
    allActivities.forEach((a) => {
      if (a.location?.name) {
        locs.add(a.location.name);
      }
    });
    return Array.from(locs).sort();
  }, [allActivities]);

  const years = useMemo(() => {
    const yrs = new Set<string>();
    allActivities.forEach((a) => {
      if (a.date) {
        const year = a.date.substring(0, 4);
        if (year && year !== "TBA") {
          yrs.add(year);
        }
      }
    });
    return Array.from(yrs).sort((a, b) => b.localeCompare(a));
  }, [allActivities]);

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    let result = [...allActivities];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description?.toLowerCase().includes(query) ||
          a.location?.name?.toLowerCase().includes(query),
      );
    }

    // Location filter
    if (selectedLocation !== "all") {
      result = result.filter((a) => a.location?.name === selectedLocation);
    }

    // Year filter
    if (selectedYear !== "all") {
      result = result.filter((a) => a.date?.startsWith(selectedYear));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (b.date || "").localeCompare(a.date || "");
        case "date-asc":
          return (a.date || "").localeCompare(b.date || "");
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [allActivities, searchQuery, selectedLocation, selectedYear, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, selectedYear, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredActivities.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedYear("all");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || selectedLocation !== "all" || selectedYear !== "all";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/#activities"
            className="flex text-white/80 hover:text-white mb-4 items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-normal mb-2">All Events</h1>
          <p className="text-white/60">
            Discover all Qubit community events and meetups
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <div className="flex items-center justify-between md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-cyan-500/50"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>

          {/* Filters (Desktop always visible, Mobile toggle) */}
          <div
            className={`${showFilters ? "block" : "hidden"} md:flex md:items-center md:gap-4`}
          >
            {/* Location Filter */}
            <div className="flex items-center gap-2 mb-3 md:mb-0">
              <MapPin size={16} className="text-white/40" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-cyan-500/50 flex-1 md:flex-none"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2 mb-3 md:mb-0">
              <Calendar size={16} className="text-white/40" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-cyan-500/50 flex-1 md:flex-none"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort (Desktop) */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <ArrowUpDown size={16} className="text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-cyan-500/50"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-white/60 text-sm">
          {totalPages > 1 ? (
            <>
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredActivities.length)} of{" "}
              {filteredActivities.length} events
            </>
          ) : (
            <>
              Showing {filteredActivities.length} of {allActivities.length}{" "}
              events
            </>
          )}
        </div>

        {/* Events Grid */}
        {paginatedActivities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedActivities.map((activity) => (
                <EventCard key={activity.id} activity={activity} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-2 text-white/40"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-cyan-500 text-black font-medium"
                            : "bg-white/5 hover:bg-white/10 text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-white/40 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-normal mb-2">No events found</h3>
            <p className="text-white/60 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function EventCard({ activity }: { activity: Activity }) {
  const getLocationText = (activity: Activity) => {
    if (activity.location?.name === "Online") return "Online";
    return activity.location?.name?.split(",")[0] || "TBA";
  };

  return (
    <Link
      href={`/events/${activity.id}`}
      className="group block bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={activity.img}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {activity.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded"
              >
                {tag.replace("[MOCK] ", "")}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-cyan-400 text-sm mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{DateUtils.formatDate(activity.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{getLocationText(activity)}</span>
          </div>
        </div>

        <h3 className="text-lg font-normal mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {activity.title}
        </h3>

        <p className="text-white/50 text-sm line-clamp-2">
          {activity.description}
        </p>
      </div>
    </Link>
  );
}
