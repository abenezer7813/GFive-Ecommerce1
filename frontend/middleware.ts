import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ role: string }>(token);

      if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "ROLE_ADMIN") {
        console.log("Not admin, redirecting to home");
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch (err) {
      console.error("Token decode failed:", err);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
