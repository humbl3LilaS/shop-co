"use client"
import {ShoppingCartIcon} from "lucide-react";
import Link from "next/link";
import {useCartStore} from "@/hooks/use-cart-store";


const CartButton = () => {
    const cart = useCartStore(state => state.cart);
    const quantity = cart.reduce((a, b) => a + b.q, 0);
    return (
        <Link
            href={"/cart"}
            className={"block relative"}
        >
            <ShoppingCartIcon strokeWidth={3}/>
            <span
                className={" w-5 absolute -top-[65%] -right-1/2 aspect-square flex justify-center items-center  rounded-full bg-red-500"}>
                            <span className={"text-xs text-white"}>
                                {quantity}
                            </span>

            </span>
        </Link>
    );
};

export default CartButton;