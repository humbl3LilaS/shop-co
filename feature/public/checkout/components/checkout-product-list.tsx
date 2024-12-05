"use client"
import {useCartStore} from "@/hooks/use-cart-store";
import CheckoutProductCard from "@/feature/public/checkout/components/checkout-product-card";

const CheckoutProductList = () => {
    const cart = useCartStore(state => state.cart);
    return (
        <div>
            {
                cart.map(item => <CheckoutProductCard data={item} key={item.pid + item.cid + item.s}/>)
            }
        </div>
    );
};

export default CheckoutProductList;