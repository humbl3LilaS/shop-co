"use server"
import {SignUpSchemaType} from "@/validation/schema";
import bcrypt from "bcryptjs";
import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {signIn} from "@/auth";

export const signUp = async (payload: SignUpSchemaType) => {
    try {
        const hashPassword = await bcrypt.hash(payload.password, 10);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {confirmPassword, password, ...userInfo} = payload;

        const [user] = await db.insert(users).values({
            ...userInfo,
            password: hashPassword,
        }).returning();


        console.log(user)

        if (!user) {
            return undefined;
        }

        await signIn("credentials", {email: payload.email, password: payload.password, redirect: false});

        return user;

    } catch (error) {
        console.error("Error performing Singup action", error);
    }
}