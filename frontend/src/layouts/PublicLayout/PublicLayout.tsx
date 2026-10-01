// import type { PropsWithChildren } from "react";

// import { PublicHeader } from "./PublicHeader";
// import { PublicFooter } from "./PublicFooter";

// export function PublicLayout({
//   children,
// }: PropsWithChildren) {
//   return (
//     <div className="min-h-screen bg-[#faf9f6] text-stone-900">
//       <PublicHeader />

//       <main>{children}</main>

//       <PublicFooter />
//     </div>
//   );
// }
// import { Outlet } from "react-router-dom";

// import { PublicHeader } from "./PublicHeader";
// import { PublicFooter } from "./PublicFooter";

// export function PublicLayout() {
//   return (
//     <div className="min-h-screen bg-[#faf9f6] text-stone-900">
//       <PublicHeader />

//       <main>
//         <Outlet />
//       </main>

//       <PublicFooter />
//     </div>
//   );
// }
import { Outlet } from "react-router-dom";

import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100">
      <PublicHeader />

      <main>
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}