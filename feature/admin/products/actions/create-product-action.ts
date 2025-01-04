"use server";

import { db } from "@/database/drizzle";
import { IProducts, products } from "@/database/schema";

export const createProduct = async (payload: Omit<IProducts, "sizes"> & { sizes: string[] }) => {
    try {
        const [product] = await db
            .insert(products)
            .values({
                ...payload,
                sizes: payload.sizes as unknown as string[],
                coverImage: payload.coverImage as unknown as string,
                imagesUrl: [],
            })
            .returning();
        if (!product) {
            return undefined;
        }
        return product;
    } catch (error) {
        console.log("error inserting products", error);
    }
};
