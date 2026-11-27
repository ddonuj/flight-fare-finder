import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

type Status = { state: "checking" } | { state: "allowed"; user: User } | { state: "denied" };

// Protected pathless layout: verifies the account with Supabase before rendering private pages,
// and re-verifies whenever the signed-in identity changes (e.g. sign-out in another tab).
export function ProtectedRoute() {
  const { user: sessionUser } = useAuth();
  const identity = sessionUser?.id ?? null;
  const [status, setStatus] = useState<Status>({ state: "checking" });

  useEffect(() => {
    let active = true;
    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (!active) return;
        setStatus(error || !data.user ? { state: "denied" } : { state: "allowed", user: data.user });
      })
      .catch(() => {
        if (active) setStatus({ state: "denied" });
      });
    return () => {
      active = false;
    };
  }, [identity]);

  if (status.state === "checking") return null;
  if (status.state === "denied") return <Navigate to="/auth" replace />;
  return <Outlet context={{ user: status.user } satisfies ProtectedContext} />;
}

type ProtectedContext = { user: User };

export function useProtectedUser() {
  return useOutletContext<ProtectedContext>().user;
}
