import { useState } from "react";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useGetPublicProgramCatalogQuery } from "@/features/programs/api/public-program-catalog.api";

import type {
  PublicProgramCatalogSort,
} from "@/features/programs/types/public-program-catalog.types";

const durationOptions = ["2 Years", "3 Years", "4 Years"];

const ITEMS_PER_PAGE = 6;

const sortOptions: Array<{
  label: string;
  value: PublicProgramCatalogSort;
}> = [
  {
    label: "Latest",
    value: "latest",
  },
  {
    label: "Fee: Low to High",
    value: "fee_asc",
  },
  {
    label: "Fee: High to Low",
    value: "fee_desc",
  },
  {
    label: "Name: A to Z",
    value: "name_asc",
  },
  {
    label: "Name: Z to A",
    value: "name_desc",
  },
];

export function ProgramsContent() {
  const [search, setSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");

  const [selectedDurations, setSelectedDurations] = useState<string[]>(
    [],
  );

  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const [sortBy, setSortBy] =
    useState<PublicProgramCatalogSort>("latest");

  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPublicProgramCatalogQuery({
    search: search.trim() || undefined,

    duration:
      selectedDurations.length > 0
        ? selectedDurations.join(",")
        : undefined,

    minFee: minFee ? Number(minFee) : undefined,

    maxFee: maxFee ? Number(maxFee) : undefined,

    sort: sortBy,

    page,

    limit: ITEMS_PER_PAGE,
  });

  const programs = data?.items ?? [];
  const pagination = data?.pagination;

  const toggleDuration = (duration: string) => {
    setSelectedDurations((current) =>
      current.includes(duration)
        ? current.filter((item) => item !== duration)
        : [...current, duration],
    );

    setPage(1);
  };

  const applyFilters = () => {
    setSearch(sidebarSearch);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setSidebarSearch("");
    setSelectedDurations([]);
    setMinFee("");
    setMaxFee("");
    setSortBy("latest");
    setPage(1);
  };

  const formatFee = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount);
  };

  const hasFilters =
    Boolean(search) ||
    Boolean(sidebarSearch) ||
    selectedDurations.length > 0 ||
    Boolean(minFee) ||
    Boolean(maxFee) ||
    sortBy !== "latest";

  return (
    <section className="bg-[#faf9f6] dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Search & Filter */}
          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} />

              <h2 className="text-sm font-bold uppercase tracking-wide">
                Search & Filter
              </h2>
            </div>

            {/* Search */}
            <div className="mt-6">
              <label
                htmlFor="program-filter-search"
                className="mb-2 block text-sm font-medium"
              >
                Search
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="program-filter-search"
                  value={sidebarSearch}
                  onChange={(event) => {
                    setSidebarSearch(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      applyFilters();
                    }
                  }}
                  placeholder="Search..."
                  className="h-11 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-[#173f35] dark:border-stone-700 dark:bg-stone-950 dark:focus:border-[#d6b56a]"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="mt-7">
              <p className="text-sm font-medium">Duration</p>

              <div className="mt-3 space-y-3">
                {durationOptions.map((duration) => (
                  <label
                    key={duration}
                    className="flex cursor-pointer items-center gap-3 text-sm text-stone-600 dark:text-stone-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDurations.includes(duration)}
                      onChange={() => toggleDuration(duration)}
                      className="h-4 w-4 accent-[#173f35]"
                    />

                    {duration}
                  </label>
                ))}
              </div>
            </div>

            {/* Fee */}
            <div className="mt-7">
              <p className="text-sm font-medium">Fee</p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="0"
                  value={minFee}
                  onChange={(event) => {
                    setMinFee(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Min"
                  className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
                />

                <input
                  type="number"
                  min="0"
                  value={maxFee}
                  onChange={(event) => {
                    setMaxFee(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Max"
                  className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <button
                type="button"
                onClick={applyFilters}
                className="w-full rounded-lg bg-[#173f35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12342d] dark:bg-[#c69a45] dark:text-stone-950"
              >
                Apply Filters
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Programs */}
          <div>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#173f35] dark:text-stone-100">
                    All Programs
                  </h2>

                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {pagination?.total ?? 0}{" "}
                    {pagination?.total === 1
                      ? "Program"
                      : "Programs"}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  {/* Search */}
                  <div className="relative sm:w-56">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(1);
                      }}
                      placeholder="Search programs..."
                      className="h-11 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-900"
                    />
                  </div>

                  {/* Sort */}
                  <div className="relative sm:w-48">
                    <select
                      value={sortBy}
                      onChange={(event) => {
                        setSortBy(
                          event.target
                            .value as PublicProgramCatalogSort,
                        );
                        setPage(1);
                      }}
                      className="h-11 w-full appearance-none rounded-lg border border-stone-300 bg-white px-3 pr-8 text-sm outline-none dark:border-stone-700 dark:bg-stone-900"
                    >
                      {sortOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loading */}
            {isLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({
                  length: ITEMS_PER_PAGE,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[330px] animate-pulse rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                  >
                    <div className="h-14 w-14 rounded-xl bg-stone-200 dark:bg-stone-800" />

                    <div className="mt-5 h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />

                    <div className="mt-3 h-6 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="h-10 rounded bg-stone-200 dark:bg-stone-800" />

                      <div className="h-10 rounded bg-stone-200 dark:bg-stone-800" />
                    </div>

                    <div className="mt-8 h-12 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center dark:border-red-900/50 dark:bg-stone-900">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                  Unable to load programs
                </h3>

                <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                  We couldn't retrieve the public program catalog.
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-5 rounded-lg bg-[#173f35] px-5 py-2.5 text-sm font-semibold text-white dark:bg-[#d6b56a] dark:text-stone-950"
                >
                  Try Again
                </button>
              </div>
            ) : programs.length > 0 ? (
              <div className="relative">
                {isFetching && (
                  <div className="absolute inset-0 z-10 rounded-2xl bg-white/50 backdrop-blur-[1px] dark:bg-stone-950/50" />
                )}

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {programs.map((program) => (
                    <article
                      key={program.id}
                      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f1eadb] text-2xl dark:bg-stone-800">
                        🎓
                      </div>

                      <div className="mt-5 flex-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#8d6b2f] dark:text-[#d6b56a]">
                          {program.mnemonic}
                        </span>

                        <h3 className="mt-2 text-xl font-bold text-[#173f35] dark:text-stone-100">
                          {program.name}
                        </h3>

                        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-stone-200 pt-4 dark:border-stone-800">
                          <div>
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                              Duration
                            </p>

                            <p className="mt-1 font-semibold text-stone-800 dark:text-stone-200">
                              {program.duration}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                              Total Fee
                            </p>

                            <p className="mt-1 font-semibold text-stone-800 dark:text-stone-200">
                              Rs. {formatFee(program.totalFee)}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
                          {program.totalSemesters}{" "}
                          {program.totalSemesters === 1
                            ? "Semester"
                            : "Semesters"}
                        </p>
                      </div>

                      <Link
                        to={`/programs/${program.id}`}
                        className="mt-6 block rounded-lg border border-[#173f35] px-4 py-2.5 text-center text-sm font-semibold text-[#173f35] transition hover:bg-[#173f35] hover:text-white dark:border-[#d6b56a] dark:text-[#d6b56a] dark:hover:bg-[#d6b56a] dark:hover:text-stone-950"
                      >
                        View Details
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center dark:border-stone-700 dark:bg-stone-900">
                <Search
                  className="mx-auto text-stone-400"
                  size={28}
                />

                <h3 className="mt-4 text-lg font-semibold">
                  No programs found
                </h3>

                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  Try changing your search or filter criteria.
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-lg bg-[#173f35] px-5 py-2.5 text-sm font-semibold text-white dark:bg-[#d6b56a] dark:text-stone-950"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.total > 0 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={!pagination.hasPrevious}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  {
                    length: pagination.totalPages,
                  },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${
                      page === pageNumber
                        ? "bg-[#173f35] text-white dark:bg-[#d6b56a] dark:text-stone-950"
                        : "border border-stone-300 text-stone-600 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={!pagination.hasNext}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        pagination.totalPages,
                        current + 1,
                      ),
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}