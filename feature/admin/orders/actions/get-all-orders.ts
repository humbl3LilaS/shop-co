"use server";
import { db } from "@/database/drizzle";
import { orders, productColors, products } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getAllOrders = async () => {
    const res = await db
        .select({
            id: orders.id,
            productPreview: products.coverImage,
            colorHex: productColors.colorHex,
            quantity: orders.quantity,
            size: orders.size,
        })
        .from(orders)
        .innerJoin(products, eq(products.id, orders.productId))
        .innerJoin(productColors, eq(productColors.id, orders.colorId));
    if (!res) {
        return [];
    }
    return res;
};

export type IOrderInfo = NonNullable<Awaited<ReturnType<typeof getAllOrders>>>[number];
