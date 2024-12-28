import { ICart } from "@/types/object.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Store = {
    cart: ICart;
    addToCart: (payload: ICart[number]) => void;
    increaseQty: (payload: { pid: string; cid: string; s: string; qty?: number }) => void;
    reduceQty: (payload: { pid: string; cid: string; s: string }) => void;
    remove: (payload: { pid: string; cid: string; s: string }) => void;
    emptyCart: () => void;
};

const getItemsInCart = () => {
    if (typeof window === "undefined") {
        return [];
    }
    const cart = sessionStorage.getItem("cart") ?? `[]`;

    return JSON.parse(cart);
};

export const useCartStore = create<Store>()(
    immer((set) => ({
        cart: getItemsInCart(),
        addToCart: (payload) =>
            set((state) => {
                state.cart.push(payload);
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        increaseQty: (payload) =>
            set((state) => {
                state.cart = state.cart.map((item) => {
                    if (
                        item.pid === payload.pid &&
                        item.cid === payload.cid &&
                        item.s === payload.s
                    ) {
                        return { ...item, q: item.q + (payload.qty ?? 1) };
                    }
                    return item;
                });
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        reduceQty: (payload) =>
            set((state) => {
                state.cart = state.cart.map((item) => {
                    if (
                        item.pid === payload.pid &&
                        item.cid === payload.cid &&
                        item.s === payload.s
                    ) {
                        return { ...item, q: item.q - 1 };
                    }
                    return item;
                });
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        remove: (payload) =>
            set((state) => {
                state.cart = state.cart.filter(
                    (item) =>
                        item.cid !== payload.cid ||
                        item.pid !== payload.pid ||
                        item.s !== payload.s,
                );
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        emptyCart: () =>
            set((state) => {
                state.cart = [];
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
    })),
);
