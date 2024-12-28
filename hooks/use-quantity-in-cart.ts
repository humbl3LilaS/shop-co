import { create } from "zustand";
import { ICart } from "@/types/object.types";

type State = {
    quantity: number;
    setQuantity: (payload: number) => void;
};

const getQuantityFormSession = () => {
    if (typeof window === "undefined") {
        return 0;
    }
    const cart = JSON.parse(sessionStorage.getItem("cart") ?? "[]") as ICart;
    return cart.reduce((a, b) => a + b.q, 0);
};

export const useQuantityInCart = create<State>((set) => ({
    quantity: getQuantityFormSession(),
    setQuantity: (payload: number) => set((state) => ({ quantity: payload + state.quantity })),
}));
