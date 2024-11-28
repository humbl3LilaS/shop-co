import {useEffect, useState} from "react";
import {ICart} from "@/types/object.types";

export const useQuantityInCart = () => {
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem("cart") ?? "[]") as ICart;
        const quantity = cart.reduce(
            (acc, value) => {
                return acc + value.q;
            }, 0)
        setQuantity(quantity)
    }, [])

    return quantity;
}