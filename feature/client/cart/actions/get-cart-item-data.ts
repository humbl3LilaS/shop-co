"use server"

import {db} from "@/database/drizzle";
import {productColors, products} from "@/database/schema";
import {and, eq} from "drizzle-orm";

export const getCartItemData = async (pid: string, cid: string) => {
    try {
        const [item] = await db.select({
                name: products.name,
                price: products.price,
                discount: products.discount,
                color: productColors.colorHex,
                imageUrl: products.coverImage,
            })
                .from(products)
                .leftJoin(productColors, eq(productColors.productId, products.id))
                .where(
                    and(
                        eq(products.id, pid),
                        eq(productColors.id, cid)
                    )
                )
        ;
        if (!item) {
            return undefined;
        }
        return item;
    } catch (err) {
        console.log("Error during fetching cart data", err)
        return undefined;
    }
}