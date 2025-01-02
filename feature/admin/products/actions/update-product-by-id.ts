"use server";
import { IProducts, products } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const updateProductById = async (id: string, payload: Partial<IProducts>) => {
    // @ts-expect-error error
    const res = await db.update(products).set(payload).where(eq(products.id, id)).returning();
    if (!res) {
        return {
            error: true,
            message: "Error updating product",
        };
    }
    return {
        error: false,
        message: "Successfully updated product",
    };
};
