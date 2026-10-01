
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "@/features/programs/api/courses.api";
import { useGetProgramsQuery } from "@/features/programs/api/program.api";

import CoursesHeader from "./components/CoursesHeader";
import CoursesPagination from "./components/CoursesPagination";
// import CoursesSearch from "./components/CoursesSearch";
import CoursesTable from "./components/CoursesTable";

import type { CourseManagementFilters } from "./types/course-management.types";
import CoursesSearch from "./components/ CoursesSearch";

const PAGE_SIZE = 10;

const INITIAL_FILTERS: CourseManagementFilters = {
  search: "",
  program: "",
  duration: "",
  minFee: "",
  maxFee: "",
};

const CourseManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [filters, setFilters] =
    useState<CourseManagementFilters>(INITIAL_FILTERS);

  const [currentPage, setCurrentPage] = useState(1);

  const [deletingCourseId, setDeletingCourseId] =
    useState<string | null>(null);

  /*
   * --------------------------------------------------
   * PROGRAMS
   * --------------------------------------------------
   */

  const {
    data: programsData,
    isLoading: isLoadingPrograms,
  } = useGetProgramsQuery({
    page: 1,
    limit: 100,
  });

  const programs = useMemo(
    () => programsData?.items ?? [],
    [programsData?.items],
  );

  /*
   * --------------------------------------------------
   * COURSE QUERY PARAMETERS
   * --------------------------------------------------
   */

  const queryParams = useMemo(() => {
    const params: {
      page: number;
      limit: number;
      search?: string;
      program?: string;
      duration?: string;
      minFee?: number;
      maxFee?: number;
      sortBy: string;
      sortOrder: "asc" | "desc";
    } = {
      page: currentPage,
      limit: PAGE_SIZE,
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    if (filters.search.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.program) {
      params.program = filters.program;
    }

    if (filters.duration.trim()) {
      params.duration = filters.duration.trim();
    }

    if (filters.minFee.trim()) {
      const minFee = Number(filters.minFee);

      if (!Number.isNaN(minFee)) {
        params.minFee = minFee;
      }
    }

    if (filters.maxFee.trim()) {
      const maxFee = Number(filters.maxFee);

      if (!Number.isNaN(maxFee)) {
        params.maxFee = maxFee;
      }
    }

    return params;
  }, [currentPage, filters]);

  /*
   * --------------------------------------------------
   * COURSES
   * --------------------------------------------------
   */

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetCoursesQuery(queryParams);

  /*
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  const [deleteCourse, { isLoading: isDeleting }] =
    useDeleteCourseMutation();

  const courses = data?.items ?? [];
  const pagination = data?.pagination;

  /*
   * --------------------------------------------------
   * FILTER HANDLERS
   * --------------------------------------------------
   */

  const handleFiltersChange = (
    nextFilters: CourseManagementFilters,
  ) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  /*
   * --------------------------------------------------
   * NAVIGATION
   * --------------------------------------------------
   */

  const handleAddCourse = () => {
    navigate("/admin/courses/new");
  };

  const handleViewCourse = (course: { id: string }) => {
    navigate(`/admin/courses/${course.id}`);
  };

  const handleEditCourse = (course: { id: string }) => {
    navigate(`/admin/courses/${course.id}/edit`);
  };

  /*
   * --------------------------------------------------
   * DELETE HANDLER
   * --------------------------------------------------
   */

  const handleDeleteCourse = async (course: {
    id: string;
    program: string;
  }) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingCourseId(course.id);

      await deleteCourse({
        id: course.id,
      }).unwrap();
    } finally {
      setDeletingCourseId(null);
    }
  };

  /*
   * --------------------------------------------------
   * LOADING STATE
   * --------------------------------------------------
   */

  if (isLoading || isLoadingPrograms) {
    return (
      <div className="min-h-full bg-stone-50 px-4 py-6 text-gray-900 dark:bg-stone-900 dark:text-gray-100 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto w-full max-w-[1600px] space-y-6">
          <CoursesHeader onAddCourse={handleAddCourse} />

          <div className="rounded-xl border border-stone-200 bg-white p-10 text-center dark:border-stone-800 dark:bg-stone-950">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Loading courses...
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please wait while the course list is loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * ERROR STATE
   * --------------------------------------------------
   */

  if (isError) {
    return (
      <div className="min-h-full bg-stone-50 px-4 py-6 text-gray-900 dark:bg-stone-900 dark:text-gray-100 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto w-full max-w-[1600px] space-y-6">
          <CoursesHeader onAddCourse={handleAddCourse} />

          <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
            <h2 className="text-sm font-semibold text-red-800 dark:text-red-300">
              Unable to load courses
            </h2>

            <p className="mt-1 text-sm text-red-700 dark:text-red-400">
              Something went wrong while loading the courses.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900/50"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * MAIN PAGE
   * --------------------------------------------------
   */

  return (
    <div className="min-h-full bg-stone-50 px-4 py-6 text-gray-900 dark:bg-stone-900 dark:text-gray-100 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        <CoursesHeader onAddCourse={handleAddCourse} />

        <CoursesSearch
          filters={filters}
          programs={programs}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        {isFetching && (
          <div className="rounded-lg border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-950">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Updating courses...
            </p>
          </div>
        )}

        <CoursesTable
          courses={courses}
          programs={programs}
          onView={handleViewCourse}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          isDeleting={isDeleting}
          deletingCourseId={deletingCourseId}
        />

        {pagination && (
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
            <CoursesPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagementPage;