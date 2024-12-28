"use server";
import { db } from "@/database/drizzle";
import { orders, products } from "@/database/schema";
import { inArray } from "drizzle-orm";

export const getTopProducts = async () => {
    const odr = await db.select().from(orders);
    const data = odr.reduce(
        (acc, order) => {
            const currentSale = acc.find((item) => item.id === order.productId);
            if (currentSale) {
                return acc.map((item) => {
                    if (item.id === currentSale.id) {
                        return {
                            id: item.id,
                            totalSales: item.totalSales + order.quantity,
                        };
                    } else return item;
                });
            } else {
                return [...acc, { id: order.productId, totalSales: order.quantity }];
            }
        },
        [] as Array<{ id: string; totalSales: number }>,
    );
    const topThree = data.sort((a, b) => b.totalSales - a.totalSales).slice(0, 3);
    const ids = topThree.map((item) => item.id);
    const topProducts = await db.select().from(products).where(inArray(products.id, ids));
    return topThree.map((top) => {
        const product = topProducts.find((item) => item.id === top.id)!;
        return {
            id: product.id,
            name: product.name,
            coverImage: product.coverImage,
            addedDate: product?.arrivedAt,
            price: product.price,
            totalEarning: top.totalSales * product.price,
        };
    });
};
