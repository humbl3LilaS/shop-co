import {ICart} from "@/types/object.types";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";


type Store = {
    cart: ICart,
    addToCart: (payload: ICart[number]) => void,
    increaseQty: (pid: string, cid: string) => void,
    reduceQty: (pid: string, cid: string, qty?: number) => void,
    remove: (pid: string, cid: string) => void,
}

const getItemsInCart = () => {
    if (typeof window === "undefined") {
        return 0;
    }
    const cart = sessionStorage.getItem('cart') ?? `[]`

    return JSON.parse(cart);
}

export const useCartStore = create<Store>()(immer((set) => ({
    cart: getItemsInCart(),
    addToCart: (payload) => set((state) => {
        state.cart.push(payload);
        console.log("add to cart executed")
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
    }),
    increaseQty: (pid: string, cid: string, qty = 1) => set((state) => {
        state.cart = state.cart.map(item => {
            if (item.pid === pid && item.cid === cid) {
                return {...item, q: item.q + qty}
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