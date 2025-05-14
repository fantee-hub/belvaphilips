import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserById } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session?.user) {
      console.log("sessionId", session.user.id);
      try {
        // Check if user exists in our database
        const { data: userData } = await getUserById(session.user.id);

        console.log("user data", userData.data);

        if (!userData.data) {
          // If user doesn't exist, redirect to OTP page to complete signup
          return NextResponse.redirect(
            `${origin}/otp?email=${session.user.email}`
          );
        }

        // If user exists, proceed with normal redirect
        return NextResponse.redirect(`${origin}${next}`);
      } catch (error) {
        console.error("Error checking user:", error);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
