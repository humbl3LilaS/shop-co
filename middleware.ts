import {auth} from "@/auth"
import {cookies} from "next/headers";
import {decrypt} from "@/lib/session";
import {NextResponse} from "next/server";

const protectedRoutes = ["/admin/dashboard"]

export default auth(async (req) => {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const cookie = (await cookies()).get("admin-session")?.value;
    const session = await decrypt(cookie);
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl))
    }
    return NextResponse.next();
})


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}