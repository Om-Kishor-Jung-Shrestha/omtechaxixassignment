// import ApplicationModel from "../../models/application.model";
// import { AppError } from "../../errors/app.error";

// import {
//   toApplicationResponseDto,
// } from "../../mapper/applicaiton.mapper";

// export async function getApplicationService(
//   id: string
// ): Promise<
//   ReturnType<typeof toApplicationResponseDto>
// > {
//   const application =
//     await ApplicationModel.findById(id);

//   if (!application) {
//     throw new AppError(
//       "Application not found",
//       404,
//       "APPLICATION_NOT_FOUND"
//     );
//   }

//   return toApplicationResponseDto(
//     application
//   );
// // }
// import ApplicationModel from "../../models/application.model";
// import { AppError } from "../../errors/app.error";

// import {
//   toApplicationResponseDto,
// } from "../../mapper/applicaiton.mapper";

// export async function getApplicationService(
//   id: string
// ): Promise<
//   ReturnType<
//     typeof toApplicationResponseDto
//   >
// > {
//   const application =
//     await ApplicationModel.findById(
//       id
//     );

//   if (!application) {
//     throw new AppError(
//       "Application not found",
//       404,
//       "APPLICATION_NOT_FOUND"
//     );
//   }

//   return toApplicationResponseDto(
//     application
//   );
// }


import ApplicationModel from "../../models/application.model";
import { AppError } from "../../errors/app.error";

import {
  toApplicationResponseDto,
} from "../../mapper/applicaiton.mapper";

import type {
  ApplicationWithPopulatedProgram,
} from "../../mapper/applicaiton.mapper";

/*
|--------------------------------------------------------------------------
| Get Single Application
|--------------------------------------------------------------------------
*/

export async function getApplicationService(
  id: string
): Promise<
  ReturnType<
    typeof toApplicationResponseDto
  >
> {
  const application =
    await ApplicationModel.findById(
      id
    ).populate<{
      program: ApplicationWithPopulatedProgram["program"];
    }>({
      path: "program",
      select: "_id mnemonic name",
    });

  if (!application) {
    throw new AppError(
      "Application not found",
      404,
      "APPLICATION_NOT_FOUND"
    );
  }

  return toApplicationResponseDto(
    application as unknown as ApplicationWithPopulatedProgram
  );
}