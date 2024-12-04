"use client"
import {useCartStore} from "@/hooks/use-cart-store";
import {useGetCartSummaryInfo} from "@/feature/public/cart/hooks/use-get-cart-summary-info";
import {useCallback, useMemo} from "react";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

const CartSummary = () => {
    const cart = useCartStore(state => state.cart);
    const pids = Array.from(new Set(cart.map(item => item.pid)));
    const {data} = useGetCartSummaryInfo(pids);
    const getCounts = useCallback((pid: string) => {
        return cart.filter(item => item.pid === pid)
            .reduce((acc, val) => acc + val.q, 0)

    }, [cart]);
    const summary = useMemo(() => {
        return data && data.reduce((acc, val) => {
            const counts = getCounts(val.pid);
            const discount = val.discount ?? 0
            return {
                totalPrice: acc.totalPrice + ((val.price - ((discount / 100) * val.price)) * counts),
                discountedPrice: acc.discountedPrice + ((discount / 100) * val.price),
            }
        }, ({totalPrice: 0, discountedPrice: 0}) as { totalPrice: number, discountedPrice: number }) as {
            totalPrice: number,
            discountedPrice: number
        };
    }, [data, pids, getCounts]);


    return (
        <>
            {
                cart.length > 0 && <div className={"h-fit mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg"}>
                    <h3 className={"text-xl font-bold"}>Order Summary</h3>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Subtotal</span>
                        <span className={"font-bold"}>
                            {
                                summary ? summary.totalPrice : "..."
                            }
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Discount</span>
                        <span className={"font-bold text-red-500"}>
                            {
                                summary ? `-${summary?.discountedPrice}` : "..."
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
                                summary ? `-${summary.totalPrice - 15}` : "..."
                            }
                        </span>
                    </p>
                    <Button className={"py-6 rounded-3xl font-bold"}>
                        <span>Go to Checkout</span>
                        <ArrowRight className={"block size-8"}/>
                    </Button>
                </div>
            }
        </>
    );
};

export default CartSummary;