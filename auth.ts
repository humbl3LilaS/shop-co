import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";

export const { signIn, signOut, auth, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: {
                    label: "password",
                    type: "string",
                },
            },
            //authorize the user using drizzle
            async authorize({ email, password }) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Add this line
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (!res.ok) {
                    return undefined;
                }
                return res.json();
            },
        }),
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session = {
                    ...session,
                    user: { ...session.user, id: token.id as string },
                };
            }
            return session;
        },
    },
});
