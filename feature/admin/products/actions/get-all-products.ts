"use server";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";

export const getAllProducts = async () => {
    const product = await db.select().from(products);
    if (!product) {
        return [];
    }
    return product;
};
