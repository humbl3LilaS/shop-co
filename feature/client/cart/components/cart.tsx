"use client";
import CartList from "@/feature/client/cart/components/cart-list";
import CartSummary from "@/feature/client/cart/components/cart-summary";

const Cart = () => {
    return (
        <div className={"md:grid gap-x-4 grid-cols-3"}>
            <CartList />
            <CartSummary />
        </div>
    );
};

export default Cart;
