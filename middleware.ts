import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import staticPageSlugs from "./lib/staticPages.preval";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/post")) {
    const slug = pathname.replace("/post/", "");
    const isStaticPage = staticPageSlugs.includes(slug);
    if (isStaticPage) {
      return NextResponse.rewrite(
        new URL(`/post/static-only/${slug}`, request.url)
      );
    } else {
      return NextResponse.rewrite(new URL(`/post/odb/${slug}`, request.url));
    }
  }
}
