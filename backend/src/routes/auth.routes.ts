// import { Router } from "express";

// import {
//   register,
//   verifyOtp,
//   login,
//   googleRedirect,
//   googleCallback,
//   googleSPA,
//   linkGoogle,
//   refresh,
//   logout,
//   forgotPassword,
//   resetPassword,
//   acceptInvite,
// } from "../controllers/auth.controller";



// import {
//   LoginDto,
// } from "../dtos/auth.dtos";
// import { asyncHandler } from "../middleware/async-handler.middleware.ts";
// import { validateDto } from "../middleware/validate.middleware";

// const router = Router();

// router.post(
//   "/register",
//   asyncHandler(register)
// );

// router.post(
//   "/verify-otp",
//   asyncHandler(verifyOtp)
// );

// router.post(
//   "/login",
//   validateDto(LoginDto),
//   asyncHandler(login)
// );

// router.get(
//   "/google",
//   googleRedirect
// );

// router.get(
//   "/google/callback",
//   asyncHandler(googleCallback)
// );

// router.post(
//   "/google/spa",
//   asyncHandler(googleSPA)
// );

// router.post(
//   "/google/link",
//   asyncHandler(linkGoogle)
// );

// router.post(
//   "/refresh",
//   asyncHandler(refresh)
// );

// router.post(
//   "/logout",
//   asyncHandler(logout)
// );

// router.post(
//   "/forgot-password",
//   asyncHandler(forgotPassword)
// );

// router.post(
//   "/reset-password",
//   asyncHandler(resetPassword)
// );

// router.post(
//   "/accept-invite",
//   asyncHandler(acceptInvite)
// );

// export default router;


import { Router } from "express";
import {
  register,
  verifyOtp,
  login,
  googleRedirect,
  googleCallback,
  googleSPA,
  linkGoogle,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  acceptInvite,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";
import { validateDto } from "../middleware/validate.middleware";
import { LoginDto } from "../dtos/auth.dtos";

const router = Router();

router.post(
  "/register",
  asyncHandler(register),
);

router.post(
  "/verify-otp",
  asyncHandler(verifyOtp),
);

router.post(
  "/login",
  validateDto(LoginDto),
  asyncHandler(login),
);

router.get(
  "/google",
  googleRedirect,
);

router.get(
  "/google/callback",
  asyncHandler(googleCallback),
);

router.post(
  "/google/spa",
  asyncHandler(googleSPA),
);

/*
 * Google account linking is an authenticated operation.
 *
 * The controller uses req.user._id, therefore this route
 * MUST run authenticate before linkGoogle.
 */
router.post(
  "/google/link",
  authenticate,
  asyncHandler(linkGoogle),
);

router.post(
  "/refresh",
  asyncHandler(refresh),
);

router.post(
  "/logout",
  asyncHandler(logout),
);

router.post(
  "/forgot-password",
  asyncHandler(forgotPassword),
);

router.post(
  "/reset-password",
  asyncHandler(resetPassword),
);

router.post(
  "/accept-invite",
  asyncHandler(acceptInvite),
);

export default router;