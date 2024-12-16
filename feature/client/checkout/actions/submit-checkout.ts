"use server"
import {ICart} from "@/types/object.types";
import {CheckoutFormSchemaType} from "@/validation/client-schema";
import {db} from "@/database/drizzle";
import {orders, transactionDetails, transactions} from "@/database/schema";
import {auth} from "@/auth";

export const submitCheckout = async (cart: ICart, checkoutDetails: CheckoutFormSchemaType, totalAmount: number) => {
    try {
        // Inserting orders into table
        const orderPromise = cart.map(cartItem => db.insert(orders)
            .values({
                productId: cartItem.pid,
                colorId: cartItem.cid,
                quantity: cartItem.q,
                size: cartItem.s,
            }).returning());
        const submittedOrder = await Promise.all(orderPromise);
        const orderIds = submittedOrder.map(item => item[0].id);

        //Checking if the user is sign-in
        const session = await auth();
        if (!session) {
            return {error: true, message: "Invalid Request"};
        }

        // Adding transactions to transactions table
        const [transaction] = await db.insert(transactions).values({
            orders: orderIds,
            customerId: session.user.id,
            status: "pending",
            amount: totalAmount,
        }).returning();
        if (!transaction) {
            return {
                error: true,
                message: "Error during the checking out process"
            }
        }

        // Adding transaction details to transactionDetails Table
        const [tDetail] = await db.insert(transactionDetails).values({
            transactionId: transaction.id,
            ...checkoutDetails,
            region: checkoutDetails.state,
            phoneNumber: checkoutDetails.phone,
        }).returning();
        if (!tDetail) {
            return {
                error: true,
                message: "Error during the checking out process"
            }
        }

        return {error: false, message: undefined};
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Error during the checking out process"
        }
    }
}