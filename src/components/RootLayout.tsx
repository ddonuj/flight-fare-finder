import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";

// The single root auth subscriber: every page reads the session from AuthContext.
export function RootLayout() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    let identityChanged = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      identityChanged = true;
      setUser(session?.user ?? null);
      setLoading(false);
      if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
    });
    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (active && !identityChanged) {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
