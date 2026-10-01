import {
  Request,
  Response,
} from "express";

import { JwtUtils } from "../utils/jwt.utils";

import {
  registerService,
} from "../services/auth/register.service";

import {
  verifyOtpService,
} from "../services/auth/verify-otp.service";

import {
  loginService,
} from "../services/auth/login.service";

import {
  createGoogleAuthUrl,
  googleCallbackService,
  googleSpaService,
} from "../services/auth/google-auth.service";

import {
  linkGoogleService,
} from "../services/auth/link-google.service";

import {
  refreshService,
} from "../services/auth/refresh.service";

import {
  logoutService,
} from "../services/auth/logout.service";

import {
  forgotPasswordService,
} from "../services/auth/forgot-password.service";

import {
  resetPasswordService,
} from "../services/auth/reset-password.service";

import {
  acceptInviteService,
} from "../services/auth/accept-invite.service";

import { AppError } from "../errors/app.error";

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  await registerService({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  res.apiSuccess(
    null,
    "OTP sent successfully",
    200
  );
}

export async function verifyOtp(
  req: Request,
  res: Response
): Promise<void> {
  const result =
    await verifyOtpService({
      email: req.body.email,
      otp: req.body.otp,
    });

  JwtUtils.setCookies(
    res,
    result.user.id
  );

  res.apiSuccess(
    {
      user: result.user,
    },
    "Account verified successfully",
    201
  );
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  const result =
    await loginService({
      email: req.body.email,
      password: req.body.password,
    });

  JwtUtils.setCookies(
    res,
    result.userId
  );

  res.apiSuccess(
    {
      user: result.user,
    },
    "Login successful"
  );
}

export function googleRedirect(
  _req: Request,
  res: Response
): void {
  const authUrl =
    createGoogleAuthUrl();

  res.redirect(authUrl);
}

export async function googleCallback(
  req: Request,
  res: Response
): Promise<void> {
  const {
    code,
    error,
  } = req.query;

  const frontendOrigin =
    process.env.CLIENT_URL ||
    "http://localhost:5173";

  if (error) {
    res.redirect(
      `${frontendOrigin}/login?error=google_cancelled`
    );

    return;
  }

  if (
    typeof code !== "string" ||
    !code
  ) {
    throw new AppError(
      "Google authorization code is missing",
      400,
      "GOOGLE_CODE_MISSING"
    );
  }

  const result =
    await googleCallbackService(
      code
    );

  JwtUtils.setCookies(
    res,
    result.userId
  );

  res.redirect(
    `${frontendOrigin}/auth/google-success`
  );
}

export async function googleSPA(
  req: Request,
  res: Response
): Promise<void> {
  const idToken =
    req.body.idToken;

  if (
    typeof idToken !== "string" ||
    !idToken
  ) {
    throw new AppError(
      "Google ID token is required",
      400,
      "GOOGLE_ID_TOKEN_REQUIRED"
    );
  }

  const result =
    await googleSpaService(
      idToken
    );

  JwtUtils.setCookies(
    res,
    result.userId
  );

  res.apiSuccess(
    {
      user: result.user,
    },
    "Google login successful"
  );
}

export async function linkGoogle(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError(
      "Authentication required",
      401,
      "AUTHENTICATION_REQUIRED"
    );
  }

  const idToken =
    req.body.idToken;

  if (
    typeof idToken !== "string" ||
    !idToken
  ) {
    throw new AppError(
      "Google ID token is required",
      400,
      "GOOGLE_ID_TOKEN_REQUIRED"
    );
  }

  await linkGoogleService({
    userId: req.user._id.toString(),
    idToken,
  });

  res.apiSuccess(
    null,
    "Google account linked successfully"
  );
}

export async function refresh(
  req: Request,
  res: Response
): Promise<void> {
  const refreshToken =
    req.cookies?.refresh_token;

  const result =
    await refreshService(
      refreshToken
    );

  /*
   * Generate a fresh access token
   * and refresh token.
   */
  JwtUtils.setCookies(
    res,
    result.userId
  );

  res.apiSuccess(
    {
      user: result.user,
    },
    "Token refreshed successfully"
  );
}

export async function logout(
  req: Request,
  res: Response
): Promise<void> {
  const refreshToken =
    req.cookies?.refresh_token;

  await logoutService(
    refreshToken
  );

  JwtUtils.clearCookies(res);

  res.apiSuccess(
    null,
    "Logged out successfully"
  );
}

export async function forgotPassword(
  req: Request,
  res: Response
): Promise<void> {
  await forgotPasswordService({
    email: req.body.email,
  });

  res.apiSuccess(
    null,
    "If the email exists, a password reset OTP has been sent"
  );
}

export async function resetPassword(
  req: Request,
  res: Response
): Promise<void> {
  await resetPasswordService({
    email: req.body.email,
    otp: req.body.otp,
    newPassword:
      req.body.newPassword,
  });

  res.apiSuccess(
    null,
    "Password reset successfully"
  );
}

export async function acceptInvite(
  req: Request,
  res: Response
): Promise<void> {
  const result =
    await acceptInviteService({
      token: req.body.token,
      firstName:
        req.body.firstName,
      middleName:
        req.body.middleName,
      lastName:
        req.body.lastName,
      password:
        req.body.password,
    });

  JwtUtils.setCookies(
    res,
    result.userId
  );

  res.apiSuccess(
    {
      user: result.user,
    },
    "Invitation accepted successfully",
    201
  );
}