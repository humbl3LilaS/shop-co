"use server"

import {db} from "@/database/drizzle";
import {reviews, users} from "@/database/schema";
import {eq} from "drizzle-orm";


export const getAllReviews = async (productId: string) => {
    const data = await db
        .select({
            id: reviews.id,
            userName: users.userName,
            content: reviews.content,
            createdAt: reviews.createdAt,
            rating: reviews.rating,
        })
        .from(reviews)
        .leftJoin(users, eq(users.id, reviews.userId))
        .where(
            eq(reviews.productId, productId),
        );
    if (!data) {
        throw new Error("Items not found");
    }
    return data;
}