import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/protected/:path*"],
};

// TODO: to get session data for use in other places. also how you can implement signing out
// const { data: { session } } = await supabase.auth.getSession();
// const accessToken = session?.access_token;

// const { error } = await supabase.auth.signOut()
