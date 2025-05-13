"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser, clearUser } from "@/lib/redux/slices/userSlice";
import Cookies from "universal-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    const supabase = createClient();

    const fetchAndStoreUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        dispatch(
          setUser({
            userId: session.user.id,
            email: session.user.email || null,
          })
        );

        if (session.access_token) {
          cookies.set("user_token", session.access_token, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });
        }
      } else {
        dispatch(clearUser());
        cookies.remove("user_token", { path: "/" });
      }
    };

    fetchAndStoreUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event);
        if (event === "SIGNED_IN" && session?.user) {
          dispatch(
            setUser({
              userId: session.user.id,
              email: session.user.email || null,
            })
          );

          if (session.access_token) {
            cookies.set("user_token", session.access_token, {
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 60 * 60 * 24,
            });
          }
        } else if (event === "SIGNED_OUT") {
          dispatch(clearUser());
          cookies.remove("user_token", { path: "/" });
        } else if (event === "TOKEN_REFRESHED" && session?.user) {
          if (session.access_token) {
            cookies.set("user_token", session.access_token, {
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 60 * 60 * 24,
            });
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
}
