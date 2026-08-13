"use client";

import { createContext, useContext, useEffect, useRef } from "react";

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const snackbarRef = useRef(null);

  useEffect(() => {
    import("@/components/modules/dk-snackbar/dk-snackbar").then(() => {
      customElements.whenDefined("dk-snackbar").then(() => {
        snackbarRef.current = document.querySelector("dk-snackbar");
      });
    });
  }, []);

  const showSnackbar = (message, duration) => {
    snackbarRef.current?.show(message, duration);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      {children}

      <dk-snackbar />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used inside SnackbarProvider");
  }

  return context;
}
