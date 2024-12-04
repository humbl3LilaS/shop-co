"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";
import {inArray} from "drizzle-orm";

export const getCartSummaryInfo = async (pids: string[]) => {
    try {
        const items = await db.select({
            pid: products.id,
            price: products.price,
            discount: products.discount,
        }).from(products).where(inArray(products.id, pids));
        if (!items) {
            return undefined;
        }
        return items
    } catch (error) {
        console.log(error)
        return undefined;
    }
}