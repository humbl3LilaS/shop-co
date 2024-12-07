"use server"

import {db} from "@/database/drizzle";
import {eq, sql} from "drizzle-orm";
import {reviews} from "@/database/schema";

export const getTotalRating = async (productId: string) => {
    try {
        const totalRating = await db.select({
            total: sql<number>`cast(sum(reviews.rating) as int)`,
            count: sql<number>`cast(count(reviews.id) as int)`
        }).from(reviews).where(eq(reviews.productId, productId));

        if (!totalRating) {
            return undefined;
        }

        return Math.round(totalRating[0].total / totalRating[0].count);
    } catch (error) {
        console.error(error)
    }
}