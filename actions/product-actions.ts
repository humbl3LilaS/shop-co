"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";
import {IProductCategory} from "@/types/object.types";
import {eq} from "drizzle-orm";

export const getRecentProducts = async () => {
    try {
        const result = await db.select().from(products).orderBy(products.arrivedAt).limit(4)
        if (!result) {
            return undefined;
        }
        return result;
    } catch (err) {
        console.log(err)
    }
}

export const getProductByCategory = async (category: IProductCategory) => {
    try {
        const result = await db.select().from(products).where(eq(products.productCategory, category));
        if (!result) {
            return undefined;
        }
        return result;
    } catch (err) {
        console.log(err)
    }
}