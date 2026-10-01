import { Request, Response } from "express";

import { createCourseService } from "../services/course/create-course.service";
import { getCoursesService } from "../services/course/get-courses.service";
import { getCourseService } from "../services/course/get-course.service";
import { updateCourseService } from "../services/course/update-course.service";
import { deleteCourseService } from "../services/course/delete-course.service";

import type { CourseQueryDto } from "../dtos/course-query.dtos";

export async function createCourse(
  req: Request,
  res: Response
): Promise<void> {
  const course = await createCourseService(req.body);

  res.apiSuccess(
    course,
    "Course created successfully",
    201
  );
}

export async function getCourses(
  req: Request,
  res: Response
): Promise<void> {
  const query =
    req.query as unknown as CourseQueryDto;

  const result =
    await getCoursesService(query);

  res.apiSuccess(
    result,
    "Courses retrieved successfully"
  );
}

export async function getCourse(
  req: Request,
  res: Response
): Promise<void> {
  const courseId =
    Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

  const course = await getCourseService(
    courseId
  );

  res.apiSuccess(
    course,
    "Course retrieved successfully"
  );
}

export async function updateCourse(
  req: Request,
  res: Response
): Promise<void> {
  const courseId =
    Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

  const course =
    await updateCourseService(
      courseId,
      req.body
    );

  res.apiSuccess(
    course,
    "Course updated successfully"
  );
}

export async function deleteCourse(
  req: Request,
  res: Response
): Promise<void> {
  const courseId =
    Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

  await deleteCourseService(
    courseId
  );

  res.apiSuccess(
    null,
    "Course deleted successfully"
  );
}