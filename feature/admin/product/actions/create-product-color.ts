"use server"
import {db} from "@/database/drizzle";
import {productColors} from "@/database/schema";

export const createProductColor = async (payload: { colorHex: string, productId: string }) => {
    try {
        const productColor = await db.insert(productColors).values({...payload}).returning();
        if(!productColor) {
            return  undefined;
        }
        return productColor;

    } catch (error) {
        console.log("error creating product color", error);
        return undefined;
    }
}