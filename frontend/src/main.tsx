
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import App from "./App";
// import { StoreProvider } from "./app/providers/store-provider";
// import { ThemeProvider } from "./app/providers/ThemeProvider";

// import "./index.css";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <ThemeProvider>
//         <StoreProvider>
//           <App />
//         </StoreProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </StrictMode>,
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import { StoreProvider } from "./app/providers/store-provider";
import { ThemeProvider } from "./app/providers/ThemeProvider";

import "./index.css";

// const googleClientId =
//   import.meta.env.VITE_GOOGLE_CLIENT_ID;

const googleClientId =
  (window as Window & {
    __APP_CONFIG__?: { GOOGLE_CLIENT_ID?: string };
  }).__APP_CONFIG__?.GOOGLE_CLIENT_ID ?? "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={googleClientId}>
          <StoreProvider>
            <App />
          </StoreProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
