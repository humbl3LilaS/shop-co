"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";

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