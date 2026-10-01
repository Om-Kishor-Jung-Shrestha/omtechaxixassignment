import mongoose from "mongoose";

import CourseModel from "../models/course.model";

import {
  PublicProgramCatalogQueryDto,
  PublicProgramCatalogResponseDto,
  PublicCourseDetailsDto,
} from "../dtos/public-program-catalog.dtos";

// import {
//   toPublicCourseDetailsDto,
//   toPublicProgramCatalogItemDto,
// } from "../mappers/public-program-catalog.mapper";

// import { AppError } from "../utils/app-error";
import { toPublicCourseDetailsDto, toPublicProgramCatalogItemDto } from "../mapper/public-program-catalog.mapper";
import { AppError } from "../errors/app.error";

type PublicProgramCatalogAggregateItem = {
  _id: mongoose.Types.ObjectId;
  duration: string;
  totalSemesters: number;
  totalFee: number;
  program: {
    _id: mongoose.Types.ObjectId;
    mnemonic: string;
    name: string;
  };
};

export const getPublicProgramCatalog = async (
  query: PublicProgramCatalogQueryDto,
): Promise<PublicProgramCatalogResponseDto> => {
  const page = Math.max(query.page ?? 1, 1);

  const limit = Math.min(
    Math.max(query.limit ?? 6, 1),
    50,
  );

  const skip = (page - 1) * limit;

  const pipeline: mongoose.PipelineStage[] = [];

  /*
   * -------------------------------------------------------
   * PROGRAM JOIN
   * -------------------------------------------------------
   *
   * Every catalog item is a Course attached to a Program.
   * Courses without a valid program are therefore excluded.
   */

  pipeline.push({
    $lookup: {
      from: "programs",
      localField: "program",
      foreignField: "_id",
      as: "program",
    },
  });

  pipeline.push({
    $unwind: "$program",
  });

  /*
   * -------------------------------------------------------
   * SEARCH
   * -------------------------------------------------------
   */

  const search = query.search?.trim();

  if (search) {
    const escapedSearch = search.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    const searchRegex = new RegExp(
      escapedSearch,
      "i",
    );

    pipeline.push({
      $match: {
        $or: [
          {
            "program.name": searchRegex,
          },
          {
            "program.mnemonic": searchRegex,
          },
          {
            duration: searchRegex,
          },
        ],
      },
    });
  }

  /*
   * -------------------------------------------------------
   * DURATION
   * -------------------------------------------------------
   */

  if (query.duration?.trim()) {
    const durations = query.duration
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (durations.length > 0) {
      pipeline.push({
        $match: {
          duration: {
            $in: durations,
          },
        },
      });
    }
  }

  /*
   * -------------------------------------------------------
   * FEE
   * -------------------------------------------------------
   */

  const feeFilter: Record<string, number> = {};

  if (query.minFee !== undefined) {
    feeFilter.$gte = query.minFee;
  }

  if (query.maxFee !== undefined) {
    feeFilter.$lte = query.maxFee;
  }

  if (Object.keys(feeFilter).length > 0) {
    pipeline.push({
      $match: {
        totalFee: feeFilter,
      },
    });
  }

  /*
   * -------------------------------------------------------
   * SORT
   * -------------------------------------------------------
   */

  switch (query.sort) {
    case "fee_asc":
      pipeline.push({
        $sort: {
          totalFee: 1,
          _id: 1,
        },
      });
      break;

    case "fee_desc":
      pipeline.push({
        $sort: {
          totalFee: -1,
          _id: 1,
        },
      });
      break;

    case "name_asc":
      pipeline.push({
        $sort: {
          "program.name": 1,
          _id: 1,
        },
      });
      break;

    case "name_desc":
      pipeline.push({
        $sort: {
          "program.name": -1,
          _id: 1,
        },
      });
      break;

    case "latest":
    default:
      pipeline.push({
        $sort: {
          createdAt: -1,
          _id: -1,
        },
      });
      break;
  }

  /*
   * -------------------------------------------------------
   * RESULT
   * -------------------------------------------------------
   */

  pipeline.push({
    $facet: {
      items: [
        {
          $skip: skip,
        },

        {
          $limit: limit,
        },

        {
          $project: {
            _id: 1,

            duration: 1,

            totalSemesters: 1,

            totalFee: 1,

            "program._id": 1,

            "program.mnemonic": 1,

            "program.name": 1,
          },
        },
      ],

      count: [
        {
          $count: "total",
        },
      ],
    },
  });

  const [result] =
    await CourseModel.aggregate(pipeline);

  const total =
    result?.count?.[0]?.total ?? 0;

  const items = (result?.items ?? []).map(
    // (course: any) =>
     (course: PublicProgramCatalogAggregateItem) =>
      toPublicProgramCatalogItemDto({
        ...course,
        program: course.program,
      }),
  );

  const totalPages = Math.max(
    Math.ceil(total / limit),
    1,
  );

  return {
    items,

    pagination: {
      page,
      limit,
      total,
      totalPages,

      hasNext: page < totalPages,

      hasPrevious: page > 1,
    },
  };
};

export const getPublicCourseDetails = async (
  courseId: string,
): Promise<PublicCourseDetailsDto> => {
  if (!mongoose.isValidObjectId(courseId)) {
    throw new AppError(
      "Invalid course ID",
      400,
      "INVALID_COURSE_ID",
    );
  }

  const course = await CourseModel.findById(courseId)
    .populate<{
      program: {
        _id: mongoose.Types.ObjectId;
        mnemonic: string;
        name: string;
      };
    }>("program", "mnemonic name")
    .lean();

  if (!course) {
    throw new AppError(
      "Course not found",
      404,
      "COURSE_NOT_FOUND",
    );
  }

  if (!course.program) {
    throw new AppError(
      "Course program could not be resolved",
      404,
      "PROGRAM_NOT_FOUND",
    );
  }

  return toPublicCourseDetailsDto(
    course as unknown as Parameters<
      typeof toPublicCourseDetailsDto
    >[0],
  );
};