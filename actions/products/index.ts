"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";

export const getProducts = async () => {
    try {
        const result = await db.select().from(products).limit(4).orderBy(products.arrivedAt)
        if (!result) {
            return undefined;
        }
        return result;
    } catch (err) {
        console.log(err)
    }
}