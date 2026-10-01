import { OAuth2Client } from "google-auth-library";

import UserModel from "../../models/user.model";

import { AppError } from "../../errors/app.error";

const googleClient =
  new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

export interface LinkGoogleServiceInput {
  userId: string;
  idToken: string;
}

export async function linkGoogleService(
  input: LinkGoogleServiceInput
): Promise<void> {
  const ticket =
    await googleClient.verifyIdToken({
      idToken: input.idToken,
      audience:
        process.env.GOOGLE_CLIENT_ID,
    });

  const payload =
    ticket.getPayload();

  if (!payload?.email) {
    throw new AppError(
      "Invalid Google account",
      400,
      "INVALID_GOOGLE_ACCOUNT"
    );
  }

  const user =
    await UserModel.findById(
      input.userId
    );

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  if (
    payload.email.toLowerCase() !==
    user.email.toLowerCase()
  ) {
    throw new AppError(
      "Google account email does not match your account email",
      400,
      "GOOGLE_EMAIL_MISMATCH"
    );
  }

  const existingGoogleUser =
    await UserModel.findOne({
      googleId: payload.sub,
      _id: {
        $ne: user._id,
      },
    });

  if (existingGoogleUser) {
    throw new AppError(
      "This Google account is already linked to another account",
      409,
      "GOOGLE_ACCOUNT_ALREADY_LINKED"
    );
  }

  user.googleId = payload.sub;
  user.providerLinked = true;

  if (
    payload.picture &&
    !user.avatar.url
  ) {
    user.avatar.url =
      payload.picture;
  }

  await user.save();
}