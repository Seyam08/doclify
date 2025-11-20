import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const isloggedIn = !!session?.user;

  if (request.nextUrl.pathname === "/dashboard" && isloggedIn === false) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (request.nextUrl.pathname === "/login" && isloggedIn === true) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
