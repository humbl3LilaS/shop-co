"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getProfileData = async (userId: string) => {
    try {
        const [data] = await db.select().from(users).where(eq(users.id, userId));
        if (!data) {
            return undefined;
        }
        return data;
    } catch (error) {
        console.log("Error getting profile data", error);
    }
};
