import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/hooks/use-cart-store";

import CartItem from "@/feature/client/cart/components/cart-item";
import { cn } from "@/lib/utils";

const CartList = () => {
    // retrieval and mutationFn of cart data store in the session storage
    const cart = useCartStore((state) => state.cart);

    return (
        <div
            className={cn(
                "mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg md:col-span-2",
                cart.length === 0 && "md:col-span-3 md:py-32",
            )}
        >
            {cart.length === 0 && (
                <h3
                    className={
                        "py-8 text-center font-bold text-2xl flex items-center justify-center gap-x-3"
                    }
                >
                    <ShoppingCart strokeWidth={2.25} /> <span>Empty Cart</span>
                </h3>
            )}

            {cart.length > 0 &&
                cart.map((item) => <CartItem data={item} key={item.pid + item.cid + item.s} />)}
        </div>
    );
};

export default CartList;
