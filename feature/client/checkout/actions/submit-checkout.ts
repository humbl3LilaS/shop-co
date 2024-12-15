"use server"
import {ICart} from "@/types/object.types";
import {CheckoutFormSchemaType} from "@/validation/client-schema";
import {db} from "@/database/drizzle";
import {orders, transactionDetails, transactions} from "@/database/schema";
import {auth} from "@/auth";

export const submitCheckout = async (cart: ICart, checkoutDetails: CheckoutFormSchemaType, totalAmount: number) => {
    try {
        const orderPromise = cart.map(cartItem => db.insert(orders)
            .values({
                productId: cartItem.pid,
                colorId: cartItem.cid,
                quantity: cartItem.q,
                size: cartItem.s,
            }).returning());
        const submittedOrder = await Promise.all(orderPromise);
        const orderIds = submittedOrder.map(item => item[0].id);

        const session = await auth();
        if (!session) {
            return undefined;
        }
        const [transaction] = await db.insert(transactions).values({
            orders: orderIds,
            customerId: session.user.id,
            status: "pending",
            amount: totalAmount,
        }).returning();
        const [tDetail] = await db.insert(transactionDetails).values({
            transactionId: transaction.id,
            ...checkoutDetails,
            region: checkoutDetails.state,
            phoneNumber: checkoutDetails.phone,
        }).returning();
        return tDetail;
    } catch (error) {
        console.log(error)
    }
}