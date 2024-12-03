"use client";
import {useCartStore} from "@/hooks/use-cart-store";
import CartList from "@/feature/public/cart/components/cart-list";


const Cart = () => {

    const cart = useCartStore(state => state.cart);
    console.log("cart", cart)
    const ids = cart.map(item => ({
        pid: item.pid,
        cid: item.cid,
    }))


    return (
        <CartList ids={ids}/>
    );
};

export default Cart;