"use server"
import {db} from "@/database/drizzle";
import {orders, productColors, products, transactions} from "@/database/schema";
import {and, eq, inArray} from "drizzle-orm";
import {auth} from "@/auth";

export const getOrdersByTransactionId = async (transactionId: string) => {
    try {
        const session = await auth()
        if (!session) {
            return undefined;
        }
        const [transaction] = await db
            .select()
            .from(transactions)
            .where(
                and(
                    eq(transactions.id, transactionId),
                    eq(transactions.customerId, session.user.id),
                ),
            );
        if (!transaction) {
            return undefined;
        }
        const order = await db
            .select({
                id: orders.id,
                name: products.name,
                price: products.price,
                discount: products.discount,
                colorHex: productColors.colorHex,
                imageUrl: products.coverImage,
                size: orders.size,
                quantity: orders.quantity,
            })
            .from(orders)
            .innerJoin(products, eq(products.id, orders.productId))
            .innerJoin(productColors, eq(productColors.id, orders.colorId))
            .where(inArray(orders.id, transaction.orders))

        if (!order) {
            return undefined;
        }
        return order;
    } catch (error) {
        console.log("Error Fetching Transaction ById", error);
    }
}

export type IOrderInfo = NonNullable<Awaited<ReturnType<typeof getOrdersByTransactionId>>>[number]