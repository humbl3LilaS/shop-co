import {auth} from "@/auth"
import {cookies} from "next/headers";
import {decrypt} from "@/lib/session";
import {NextResponse} from "next/server";

export default auth(async (req) => {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = path.startsWith("/admin/dashboard");
    const cookie = (await cookies()).get("admin-session")?.value;
    const session = await decrypt(cookie);
    const userSession = await auth();
    if (path === "/") {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visit-count`, {method: "POST", body: JSON.stringify({id: userSession?.user.id})});
    }
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl))
    }
    return NextResponse.next();
})


export const config = {
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
    matcher: ["/admin/dashboard", "/admin/dashboard/:path*", "/"],
}