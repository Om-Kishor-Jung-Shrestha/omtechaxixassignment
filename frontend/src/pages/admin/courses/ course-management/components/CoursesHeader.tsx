import React from "react";

interface CoursesHeaderProps {
  onAddCourse: () => void;
}

const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  onAddCourse,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Course Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage courses, view course details, and maintain course information.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddCourse}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
      >
        Add Course
      </button>
    </div>
  );
};

export default CoursesHeader;