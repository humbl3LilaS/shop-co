"use server"

import {ProductFormSchemaType} from "@/validation/schema";
import {db} from "@/database/drizzle";
import {products} from "@/database/schema";

export const createProduct = async (payload: Omit<ProductFormSchemaType, "colorHex">) => {
    try {
        const [product] = await db.insert(products).values(
            //@ts-expect-error so sick of checking this type
            {
                ...payload,
            }).returning();
        if (!product) {
            return undefined;
        }
        console.log(product);
        return product;
    } catch (error) {
        console.log("error inserting product", error)
    }
}