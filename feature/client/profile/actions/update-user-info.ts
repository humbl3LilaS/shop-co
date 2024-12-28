"use server";
import { IUserInfo } from "@/types/api.types";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export const updateUserInfo = async (payload: Partial<IUserInfo>) => {
    try {
        const session = await auth();
        if (!session) {
            return undefined;
        }
        const [data] = await db
            .update(users)
            .set(payload)
            .where(eq(users.id, session.user.id))
            .returning();
        if (!data) {
            return undefined;
        }
        return data;
    } catch (error) {
        console.log("Error updating user info", error);
    }
};
