import {ICart} from "@/types/object.types";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import cart from "@/feature/public/cart/components/cart";


type Store = {
    cart: ICart,
    increaseQty: (pid: string, cid: string) => void,
    reduceQty: (pid: string, cid: string) => void,
    remove: (pid: string, cid: string) => void,
}

const getItemsInCart = () => {
    const cart = sessionStorage.getItem('cart') ?? `[]`

    return JSON.parse(cart);
}

export const useCartStore = create<Store>()(immer((set) => ({
    cart: getItemsInCart(),
    increaseQty: (pid: string, cid: string) => set((state) => {
        state.cart = state.cart.map(item => {
            if (item.pid === pid && item.cid === cid) {
                return {...item, q: item.q + 1}
            }
            return item;
        });
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
    }),
    reduceQty: (pid: string, cid: string) => set((state) => {
        state.cart = state.cart.map(item => {
            if (item.pid === pid && item.cid === cid) {
                return {...item, q: item.q - 1}
            }
            return item;
        });
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
    }),
    remove: (pid: string, cid: string) => set((state) => {
        state.cart = state.cart.filter(item => item.cid !== cid || item.pid !== pid)
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
    })
})))