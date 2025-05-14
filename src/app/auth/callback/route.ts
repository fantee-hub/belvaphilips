import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
      console.log("Authentication successful for user:", session.user.id);

      // redirect to the next page or home page
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Session exchange error:", error);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
