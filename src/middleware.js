import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoute = ["/dashboard", "/posts/create"];
const publicRoute = ["/login", "/register"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  const isProtected =
    protectedRoute.includes(path) || path.startsWith("/posts/update/");
  const isPublic = publicRoute.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
