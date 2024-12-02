"use server"

import {db} from "@/database/drizzle";
import {productColors, products} from "@/database/schema";
import {and, eq, inArray} from "drizzle-orm";

export const getItemsInCart = async (ids: Array<{ pid: string, cid: string }>) => {
    try {
        const pids = ids.map(item => item.pid);
        const cids = ids.map(item => item.cid);
        console.log(pids, cids)
        const items = await db.select({
                pid: products.id,
                cid: productColors.id,
                name: products.name,
                price: products.price,
                discount: products.discount,
                color: productColors.colorHex,
                imageUrl: products.coverImage,
            }).from(products)
                .leftJoin(productColors, eq(productColors.productId, products.id))
                .where(
                    and(
                        inArray(products.id, pids),
                        inArray(productColors.id, cids)
                    )
                )
        ;
        console.log("items in sever", items)
        if (!items) {
            return undefined;
        }
        return items;
    } catch (e) {
        console.log("Error fetching items from cart", e);
        return undefined;
    }
}