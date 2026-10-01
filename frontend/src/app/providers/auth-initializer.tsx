import { useEffect, useRef } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import {
  clearAuth,
  setInitialized,
  setUser,
} from "@/app/store/slices/auth/auth.slice";
import { useRefreshMutation } from "@/features/auth/api/auth.api";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({
  children,
}: AuthInitializerProps) {
  const dispatch = useAppDispatch();
  const [refresh] = useRefreshMutation();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    async function initializeAuth() {
      try {
        const response = await refresh().unwrap();

        dispatch(setUser(response.user));
      } catch {
        dispatch(clearAuth());
      } finally {
        dispatch(setInitialized());
      }
    }

    initializeAuth();
  }, [dispatch, refresh]);

  return <>{children}</>;
}