"use client"
import {useCartStore} from "@/hooks/use-cart-store";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {useCartSummary} from "@/hooks/use-cart-summary";


const CartSummary = () => {
    const cart = useCartStore(state => state.cart);
    const summary = useCartSummary();

    return (
        <>
            {
                cart.length > 0 &&
                <div className={"h-fit mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg"}>
                    <h3 className={"text-xl font-bold"}>Order Summary</h3>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Subtotal</span>
                        <span className={"font-bold"}>
                            {
                                summary ? `$${summary.totalPrice}` : "..."
                            }
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Discount</span>
                        <span className={"font-bold text-red-500"}>
                            {
                                summary ? `-$${summary?.discountedPrice}` : "..."
                            }
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>DeliveryFee</span>
                        <span className={"font-bold"}>
                            {
                                summary ? "$15" : "..."
                            }
                        </span>
                    </p>
                    <hr/>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Total</span>
                        <span className={"font-bold"}>
                            {
                                summary ? `$${summary.totalPrice - 15}` : "..."
                            }
                        </span>
                    </p>
                    <Link href={"/checkout"}
                          className={"py-2 flex items-center justify-center gap-x-2 bg-black text-white rounded-3xl font-bold"}>
                        <span>Go to Checkout</span>
                        <ArrowRight className={"block size-8"}/>
                    </Link>
                </div>
            }
        </>
    );
};

export default CartSummary;