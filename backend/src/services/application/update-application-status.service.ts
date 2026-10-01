// import ApplicationModel from "../../models/application.model";
// import { AppError } from "../../errors/app.error";

// import {
//   toApplicationResponseDto,
// } from "../../mapper/applicaiton.mapper";

// import type { UpdateStatusDto } from "../../dtos/application.dtos";

// export async function updateApplicationStatusService(
//   id: string,
//   dto: UpdateStatusDto
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

//   application.status =
//     dto.status;

//   await application.save();

//   return toApplicationResponseDto(
//     application
//   );
// }

import ApplicationModel from "../../models/application.model";
import { AppError } from "../../errors/app.error";

import {
  toApplicationResponseDto,
}  from "../../mapper/applicaiton.mapper";

import type {
  UpdateStatusDto,
} from "../../dtos/application.dtos";

export async function updateApplicationStatusService(
  id: string,
  dto: UpdateStatusDto
): Promise<
  ReturnType<
    typeof toApplicationResponseDto
  >
> {
  const application =
    await ApplicationModel.findById(
      id
    );

  if (!application) {
    throw new AppError(
      "Application not found",
      404,
      "APPLICATION_NOT_FOUND"
    );
  }

  application.status =
    dto.status;

//   await application.save();

//   return toApplicationResponseDto(
//     application
//   );
// }

await application.save();

const populatedApplication =
  await application.populate<{
    program: {
      _id: typeof application.program;
      mnemonic: string;
      name: string;
    };
  }>("program");

return toApplicationResponseDto(
  populatedApplication
);
}