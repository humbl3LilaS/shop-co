"use client";
import { useCartStore } from "@/hooks/use-cart-store";
import CheckoutProductCard from "@/feature/client/checkout/components/checkout-product-card";

const CheckoutProductList = () => {
    const cart = useCartStore((state) => state.cart);
    return (
        <div className="flex flex-col gap-y-3">
            {cart.map((item) => (
                <CheckoutProductCard data={item} key={item.pid + item.cid + item.s} />
            ))}
        </div>
    );
};

export default CheckoutProductList;
