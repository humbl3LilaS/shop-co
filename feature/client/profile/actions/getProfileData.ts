"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

const fetchUserProfile = async (userId: string) => {
    try {
        console.log("profile fetched");
        const [data] = await db.select().from(users).where(eq(users.id, userId));
        if (!data) {
            return undefined;
        }
        return data;
    } catch (error) {
        console.log("Error getting profile data", error);
    }
};

export const getProfileData = unstable_cache(
    fetchUserProfile,
    ["user-profile"]
);

export const revalidateUserProfileData = async () => {
    revalidateTag("user-profile");
    revalidatePath("/profile");
};