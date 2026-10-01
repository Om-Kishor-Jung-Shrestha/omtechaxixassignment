import { OAuth2Client } from "google-auth-library";

import UserModel from "../../models/user.model";


import { AppError } from "../../errors/app.error";
import { toUserResponseDto } from "../../mapper/user.mapper";

const googleClient =
  new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI ||
      "http://localhost:8000/api/v1/auth/google/callback"
  );

export interface GoogleAuthResult {
  userId: string;
  user: ReturnType<typeof toUserResponseDto>;
}

export function createGoogleAuthUrl(): string {
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:8000/api/v1/auth/google/callback";

  return googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    redirect_uri: redirectUri,
    prompt: "select_account",
  });
}

export async function googleCallbackService(
  code: string
): Promise<GoogleAuthResult> {
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:8000/api/v1/auth/google/callback";

  const { tokens } =
    await googleClient.getToken({
      code,
      redirect_uri: redirectUri,
    });

  if (!tokens.id_token) {
    throw new AppError(
      "Google authentication failed",
      401,
      "GOOGLE_AUTH_FAILED"
    );
  }

  const ticket =
    await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience:
        process.env.GOOGLE_CLIENT_ID,
    });

  const payload =
    ticket.getPayload();

  if (!payload) {
    throw new AppError(
      "Invalid Google account",
      401,
      "INVALID_GOOGLE_ACCOUNT"
    );
  }

  return handleGoogleUser({
    googleId: payload.sub,
    email: payload.email,
    firstName:
      payload.given_name || "",
    lastName:
      payload.family_name || "",
    picture:
      payload.picture || "",
  });
}

export async function googleSpaService(
  idToken: string
): Promise<GoogleAuthResult> {
  const ticket =
    await googleClient.verifyIdToken({
      idToken,
      audience:
        process.env.GOOGLE_CLIENT_ID,
    });

  const payload =
    ticket.getPayload();

  if (!payload) {
    throw new AppError(
      "Invalid Google account",
      401,
      "INVALID_GOOGLE_ACCOUNT"
    );
  }

  return handleGoogleUser({
    googleId: payload.sub,
    email: payload.email,
    firstName:
      payload.given_name || "",
    lastName:
      payload.family_name || "",
    picture:
      payload.picture || "",
  });
}

interface GoogleUserData {
  googleId: string;
  email?: string;
  firstName: string;
  lastName: string;
  picture: string;
}

async function handleGoogleUser(
  data: GoogleUserData
): Promise<GoogleAuthResult> {
  if (!data.email) {
    throw new AppError(
      "Google account email is unavailable",
      400,
      "GOOGLE_EMAIL_UNAVAILABLE"
    );
  }

  const email =
    data.email.toLowerCase().trim();

  let user =
    await UserModel.findOne({
      $or: [
        {
          googleId: data.googleId,
        },
        {
          email,
        },
      ],
    });

  if (!user) {
    user = await UserModel.create({
      firstName:
        data.firstName || "Google",
      lastName:
        data.lastName || "User",
      email,
      authProvider: "google",
      googleId: data.googleId,
      isVerified: true,
      providerLinked: true,
      avatar: {
        public_id: "",
        url: data.picture,
      },
    });
  } else {
    let changed = false;

    if (!user.googleId) {
      user.googleId =
        data.googleId;
      changed = true;
    }

    if (
      user.authProvider !== "google"
    ) {
      user.authProvider = "google";
      changed = true;
    }

    if (!user.providerLinked) {
      user.providerLinked = true;
      changed = true;
    }

    if (!user.isVerified) {
      user.isVerified = true;
      changed = true;
    }

    if (
      !user.avatar.url &&
      data.picture
    ) {
      user.avatar.url =
        data.picture;
      changed = true;
    }

    if (changed) {
      await user.save();
    }
  }

  if (user.status === "deactivated") {
    throw new AppError(
      "Account deactivated",
      403,
      "ACCOUNT_DEACTIVATED"
    );
  }

  return {
    userId: user._id.toString(),
    user: toUserResponseDto(user),
  };
}