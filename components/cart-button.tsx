"use client"
import {ShoppingCartIcon} from "lucide-react";
import Link from "next/link";
import {useQuantityInCart} from "@/hooks/use-quantity-in-cart";
import {useEffect, useState} from "react";


const CartButton = () => {
    const stored = useQuantityInCart(state => state.quantity);
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        setQuantity(stored)
    }, [stored])
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