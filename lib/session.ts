import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/types/admin.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(key);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return payload;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    const cookie = await cookies();

    cookie.set("admin-session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function verifySession() {
    const cookie = (await cookies()).get("admin-session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        return "/admin";
    }

    return { isAuth: true, userId: session.userId };
}

export async function updateSession() {
    const cookie = await cookies();
    const session = cookie.get("admin-session")?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookie.set("admin-session", session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
}

export async function deleteSession() {
    const cookie = await cookies();
    cookie.delete("admin-session");
    redirect("/admin");
}
