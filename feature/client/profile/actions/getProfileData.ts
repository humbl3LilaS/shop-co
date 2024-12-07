"use server"

import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {eq} from "drizzle-orm";

export const getProfileData = async (profileId: string) => {
    try {
        const [data] = await db
            .select({
                id: users.id,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
                userName: users.userName,
                profileImage: users.profileImage,
            })
            .from(users)
            .where(eq(users.id, profileId));
        if (!data) {
            return undefined;
        }
        return data;
    } catch (error) {
        console.log("Error getting profile data", error);
    }
}