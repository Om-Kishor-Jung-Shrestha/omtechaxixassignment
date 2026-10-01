


// import { Navigate, Route, Routes } from "react-router-dom";

// import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
// import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";

// import { HomePage } from "@/pages/public/HomePage";
// import { AboutPage } from "@/pages/public/AboutPage";
// import { ProgramsPage } from "@/pages/public/ProgramsPage";
// import { ContactPage } from "@/pages/public/ContactPage";
// import { AdmissionPage } from "@/pages/public/AdmissionPage";

// import { LoginPage } from "@/pages/auth/LoginPage";
// import { SignupPage } from "@/pages/auth/SignupPage";
// import { VerifyOtpPage } from "@/pages/auth/VerifyOtpPage";

// import { DashboardPage } from "@/pages/admin/DashboardPage";
// import { ProgramsManagementPage } from "@/pages/admin/programs/ProgramsManagementPage";

// import { CourseBuilderPage } from "@/pages/admin/courses/CourseBuilderPage";
// // import CourseManagementPage from "@/pages/admin/courses/course-management/CourseManagementPage";
// import { CourseDetailsPage } from "@/pages/admin/courses/CourseDetailsPage";

// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute";
// import { GuestRoute } from "./routes/GuestRoute";
// import CourseManagementPage from "./pages/admin/courses/ course-management/CourseManagementPage";

// function App() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/programs" element={<ProgramsPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/admission" element={<AdmissionPage />} />
//       </Route>

//       {/* Guest */}
//       <Route element={<GuestRoute />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route
//           path="/verify-otp"
//           element={<VerifyOtpPage />}
//         />
//       </Route>

//       {/* Authenticated */}
//       <Route element={<ProtectedRoute />}>
//         <Route element={<DashboardLayout />}>
//           <Route
//             path="/dashboard"
//             element={<DashboardPage />}
//           />

//           <Route
//             path="/applications"
//             element={
//               <div className="p-8">
//                 Applications
//               </div>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <div className="p-8">
//                 Profile
//               </div>
//             }
//           />

//           {/* Admin only */}
//           <Route element={<ProtectedAdminRoute />}>
//             <Route
//               path="/admin/programs"
//               element={<ProgramsManagementPage />}
//             />

//             {/* Course Management */}
//             <Route
//               path="/admin/courses"
//               element={<CourseManagementPage />}
//             />

//             {/* Create Course */}
//             <Route
//               path="/admin/courses/new"
//               element={<CourseBuilderPage />}
//             />

//             {/* View Course */}
//             <Route
//               path="/admin/courses/:id"
//               element={<CourseDetailsPage />}
//             />

//             {/* Edit Course */}
//             <Route
//               path="/admin/courses/:id/edit"
//               element={<CourseBuilderPage />}
//             />

//             <Route
//               path="/admin/users"
//               element={
//                 <div className="p-8">
//                   Users
//                 </div>
//               }
//             />

//             <Route
//               path="/admin/settings"
//               element={
//                 <div className="p-8">
//                   Settings
//                 </div>
//               }
//             />
//           </Route>
//         </Route>
//       </Route>

//       {/* Fallback */}
//       <Route
//         path="*"
//         element={<Navigate to="/" replace />}
//       />
//     </Routes>
//   );
// }

// export default App;










// import { Navigate, Route, Routes } from "react-router-dom";
// import UserProfilePage from "@/pages/user-profile/UserProfilePage";
// import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
// import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";

// import { HomePage } from "@/pages/public/HomePage";
// import { AboutPage } from "@/pages/public/AboutPage";
// import { ProgramsPage } from "@/pages/public/ProgramsPage";
// import { ContactPage } from "@/pages/public/ContactPage";
// import { AdmissionPage } from "@/pages/public/AdmissionPage";

// import { LoginPage } from "@/pages/auth/LoginPage";
// import { SignupPage } from "@/pages/auth/SignupPage";
// import { VerifyOtpPage } from "@/pages/auth/VerifyOtpPage";

// import { DashboardPage } from "@/pages/admin/DashboardPage";
// import { ProgramsManagementPage } from "@/pages/admin/programs/ProgramsManagementPage";

// import { CourseBuilderPage } from "@/pages/admin/courses/CourseBuilderPage";
// import { CourseDetailsPage } from "@/pages/admin/courses/CourseDetailsPage";

// import CourseManagementPage from "./pages/admin/courses/ course-management/CourseManagementPage";

// // import { ApplicationManagementProgram } from "@/pages/admin/application-management/application-management-program";
// // import { ApplicationDetailsPage } from "@/pages/admin/application-management/application-details-page";

// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute";
// import { GuestRoute } from "./routes/GuestRoute";
// import ApplicationManagementProgram from "./pages/admin/application-management/application-management-program";
// import ApplicationDetailsPage from "./pages/admin/application-management/ application-details-page";

// function App() {
//   return (
//     <Routes>
//       {/* =====================================================
//           PUBLIC
//       ===================================================== */}

//       <Route element={<PublicLayout />}>
//         <Route
//           path="/"
//           element={<HomePage />}
//         />

//         <Route
//           path="/about"
//           element={<AboutPage />}
//         />

//         <Route
//           path="/programs"
//           element={<ProgramsPage />}
//         />

//         <Route
//           path="/contact"
//           element={<ContactPage />}
//         />

//         <Route
//           path="/admission"
//           element={<AdmissionPage />}
//         />
//       </Route>

//       {/* =====================================================
//           GUEST
//       ===================================================== */}

//       <Route element={<GuestRoute />}>
//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />

//         <Route
//           path="/signup"
//           element={<SignupPage />}
//         />

//         <Route
//           path="/verify-otp"
//           element={<VerifyOtpPage />}
//         />
//       </Route>

//       {/* =====================================================
//           AUTHENTICATED
//       ===================================================== */}

//       <Route element={<ProtectedRoute />}>
//         <Route element={<DashboardLayout />}>
//           {/* Dashboard */}

//           <Route
//             path="/dashboard"
//             element={<DashboardPage />}
//           />

//           {/* Normal authenticated applications page */}

//           <Route
//             path="/applications"
//             element={

//               <ApplicationManagementProgram />

//             }
//           />

//           <Route path="/applications/:id" element={<ApplicationDetailsPage />} />

//           {/* Profile */}

//           <Route
//             path="/profile"
//             element={<UserProfilePage />}
//           />

//           {/* =================================================
//               ADMIN ONLY
//           ================================================= */}

//           <Route element={<ProtectedAdminRoute />}>
//             {/* Application Management */}

//             <Route
//               path="/admin/applications"
//               element={
//                 <ApplicationManagementProgram />
//               }
//             />

//             {/* Application Details */}

//             <Route
//               path="/admin/applications/:id"
//               element={
//                 <ApplicationDetailsPage />
//               }
//             />

//             {/* Programs */}

//             <Route
//               path="/admin/programs"
//               element={
//                 <ProgramsManagementPage />
//               }
//             />

//             {/* =================================================
//                 COURSE MANAGEMENT
//             ================================================= */}

//             <Route
//               path="/admin/courses"
//               element={
//                 <CourseManagementPage />
//               }
//             />

//             {/* Create Course */}

//             <Route
//               path="/admin/courses/new"
//               element={
//                 <CourseBuilderPage />
//               }
//             />

//             {/* View Course */}

//             <Route
//               path="/admin/courses/:id"
//               element={
//                 <CourseDetailsPage />
//               }
//             />

//             {/* Edit Course */}

//             <Route
//               path="/admin/courses/:id/edit"
//               element={
//                 <CourseBuilderPage />
//               }
//             />

//             {/* Users */}

//             <Route
//               path="/admin/users"
//               element={
//                 <div className="p-8">
//                   Users
//                 </div>
//               }
//             />

//             {/* Settings */}

//             <Route
//               path="/admin/settings"
//               element={
//                 <div className="p-8">
//                   Settings
//                 </div>
//               }
//             />
//           </Route>
//         </Route>
//       </Route>

//       {/* =====================================================
//           FALLBACK
//       ===================================================== */}

//       <Route
//         path="*"
//         element={
//           <Navigate
//             to="/"
//             replace
//           />
//         }
//       />
//     </Routes>
//   );
// }

// export default App;



import { Navigate, Route, Routes } from "react-router-dom";
import SettingsPage from "./pages/admin/settings/settings.page";

import UserProfilePage from "@/pages/user-profile/UserProfilePage";

import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";

import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";

import { HomePage } from "@/pages/public/HomePage";

import { AboutPage } from "@/pages/public/AboutPage";

import { ProgramsPage } from "@/pages/public/ProgramsPage";

import { ContactPage } from "@/pages/public/ContactPage";

import { AdmissionPage } from "@/pages/public/AdmissionPage";

import { LoginPage } from "@/pages/auth/LoginPage";

import { SignupPage } from "@/pages/auth/SignupPage";

import { VerifyOtpPage } from "@/pages/auth/VerifyOtpPage";

import { DashboardPage } from "@/pages/admin/DashboardPage";

import { ProgramsManagementPage } from "@/pages/admin/programs/ProgramsManagementPage";

import { CourseBuilderPage } from "@/pages/admin/courses/CourseBuilderPage";

import { CourseDetailsPage } from "@/pages/admin/courses/CourseDetailsPage";

import CourseManagementPage from "./pages/admin/courses/ course-management/CourseManagementPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";

// import { ApplicationManagementProgram } from "@/pages/admin/application-management/application-management-program";

// import { ApplicationDetailsPage } from "@/pages/admin/application-management/application-details-page";

import { ProtectedRoute } from "./routes/ProtectedRoute";

import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute";

import { GuestRoute } from "./routes/GuestRoute";

import ApplicationManagementProgram from "./pages/admin/application-management/application-management-program";

import ApplicationDetailsPage from "./pages/admin/application-management/ application-details-page";

import UserManagementPage from "./pages/admin/user-management/user-management.page";
// import { CourseDetailsPage } from "@/pages/public/CourseDetailsPage";
import { CourseDetailsPage as PublicCourseDetailsPage } from "@/pages/public/CourseDetailsPage";
import { AuthInitializer } from "@/app/providers/auth-initializer";


function App() {
  return (
    <AuthInitializer>
    <Routes>
      {/* =====================================================
          PUBLIC
      ===================================================== */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/programs" element={<ProgramsPage />} />
         <Route
    path="/programs/:id"
    element={<PublicCourseDetailsPage />}
  />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/admission" element={<AdmissionPage />} />
      </Route>

      {/* =====================================================
          GUEST
      ===================================================== */}

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />
         <Route
    path="/forgot-password"
    element={<ForgotPasswordPage />}
  />
  <Route
    path="/reset-password"
    element={<ResetPasswordPage />}
  />

        <Route path="/verify-otp" element={<VerifyOtpPage />} />
      </Route>

      {/* =====================================================
          AUTHENTICATED
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}

          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Normal authenticated applications page */}

          <Route
            path="/applications"
            element={<ApplicationManagementProgram />}
          />

          <Route
            path="/applications/:id"
            element={<ApplicationDetailsPage />}
          />

          {/* Profile */}

          <Route path="/profile" element={<UserProfilePage />} />

          {/* =================================================
              ADMIN ONLY
          ================================================= */}

          <Route element={<ProtectedAdminRoute />}>
            {/* Application Management */}

            <Route
              path="/admin/applications"
              element={<ApplicationManagementProgram />}
            />

            {/* Application Details */}

            <Route
              path="/admin/applications/:id"
              element={<ApplicationDetailsPage />}
            />

            {/* Programs */}

            <Route
              path="/admin/programs"
              element={<ProgramsManagementPage />}
            />

            {/* =================================================
                COURSE MANAGEMENT
            ================================================= */}

            <Route
              path="/admin/courses"
              element={<CourseManagementPage />}
            />

            {/* Create Course */}

            <Route
              path="/admin/courses/new"
              element={<CourseBuilderPage />}
            />

            {/* View Course */}

            <Route
              path="/admin/courses/:id"
              element={<CourseDetailsPage />}
            />

            {/* Edit Course */}

            <Route
              path="/admin/courses/:id/edit"
              element={<CourseBuilderPage />}
            />

            {/* Users */}

            <Route
              path="/admin/users"
              element={<UserManagementPage />}
            />

            {/* Settings */}

            {/* <Route
              path="/admin/settings"
              element={
                <div className="p-8">
                  Settings
                </div>
              }
            />
          </Route> */}
          <Route
          path="/admin/settings"
          element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>

      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
    </AuthInitializer>
  );
}

export default App;
