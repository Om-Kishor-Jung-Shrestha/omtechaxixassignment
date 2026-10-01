// import {
//   useEffect,
//   useMemo,
//   useState,
//   type PropsWithChildren,
// } from "react";

// import { ThemeContext } from "./theme-context";

// export function ThemeProvider({ children }: PropsWithChildren) {
//   const [theme, setTheme] = useState<"light" | "dark">(() => {
//     const storedTheme = localStorage.getItem("theme");

//     if (storedTheme === "dark" || storedTheme === "light") {
//       return storedTheme;
//     }

//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });

//   useEffect(() => {
//     const root = document.documentElement;

//     root.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const value = useMemo(
//     () => ({
//       theme,
//       toggleTheme: () => {
//         setTheme((currentTheme) =>
//           currentTheme === "light" ? "dark" : "light",
//         );
//       },
//     }),
//     [theme],
//   );

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// // }
// import {
//   useEffect,
//   useMemo,
//   useState,
//   type PropsWithChildren,
// } from "react";

// import { ThemeContext } from "./theme-context";

// export function ThemeProvider({ children }: PropsWithChildren) {
//   const [theme, setTheme] = useState<"light" | "dark">(() => {
//     const storedTheme = localStorage.getItem("theme");

//     if (storedTheme === "dark" || storedTheme === "light") {
//       return storedTheme;
//     }

//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const value = useMemo(
//     () => ({
//       theme,
//       toggleTheme: () => {
//         setTheme((currentTheme) =>
//           currentTheme === "light" ? "dark" : "light",
//         );
//       },
//     }),
//     [theme],
//   );

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { ThemeContext } from "./theme-context";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) =>
          currentTheme === "light" ? "dark" : "light",
        );
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}