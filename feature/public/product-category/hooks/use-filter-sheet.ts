import {create} from "zustand";

type Type = {
    isOpen: boolean;
    toggle: () => void;
}

export const useFilterSheet = create<Type>((set) => ({
    isOpen: false,
    toggle: () => {
        set((state) => ({isOpen: !state.isOpen}));
    }
}))